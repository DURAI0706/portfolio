import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { SocialFeed } from '@shared/schema';

interface SocialFeedResponse {
  success: boolean;
  feeds: SocialFeed[];
}

export default function SocialFeedSection() {
  const queryClient = useQueryClient();

  // Fetch GitHub feeds
  const { data: githubData, isLoading: githubLoading } = useQuery<SocialFeedResponse>({
    queryKey: ['/api/social-feeds', { source: 'github' }],
    queryFn: () => fetch('/api/social-feeds?source=github').then(res => res.json()),
  });

  // Fetch Medium feeds
  const { data: mediumData, isLoading: mediumLoading } = useQuery<SocialFeedResponse>({
    queryKey: ['/api/social-feeds', { source: 'medium' }],
    queryFn: () => fetch('/api/social-feeds?source=medium').then(res => res.json()),
  });

  // Update GitHub mutation
  const updateGithubMutation = useMutation({
    mutationFn: () => fetch('/api/update-github', { method: 'POST' }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/social-feeds', { source: 'github' }] });
    },
  });

  // Update Medium mutation
  const updateMediumMutation = useMutation({
    mutationFn: () => fetch('/api/update-medium', { method: 'POST' }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/social-feeds', { source: 'medium' }] });
    },
  });

  // Auto-update feeds on component mount
  useEffect(() => {
    const updateFeeds = async () => {
      try {
        await Promise.all([
          updateGithubMutation.mutateAsync(),
          updateMediumMutation.mutateAsync()
        ]);
      } catch (error) {
        console.error('Failed to update feeds:', error);
      }
    };

    // Update feeds immediately and then every 30 minutes
    updateFeeds();
    const interval = setInterval(updateFeeds, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const githubFeeds = githubData?.feeds || [];
  const mediumFeeds = mediumData?.feeds || [];

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-center mb-16">
          Latest <span className="cyber-blue">Updates</span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* GitHub Feed */}
          <GitHubFeed feeds={githubFeeds} isLoading={githubLoading} />
          
          {/* Medium Feed */}
          <MediumFeed feeds={mediumFeeds} isLoading={mediumLoading} />
        </div>
      </div>
    </section>
  );
}

function GitHubFeed({ feeds, isLoading }: { feeds: SocialFeed[]; isLoading: boolean }) {
  const formatTimeAgo = (date: string | Date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} weeks ago`;
  };

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center mb-6">
          <i className="fab fa-github text-2xl cyber-blue mr-3"></i>
          <h3 className="text-xl font-semibold">Latest Repositories</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-white/10 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded mb-3 w-3/4"></div>
              <div className="flex space-x-4">
                <div className="h-3 bg-gray-700 rounded w-16"></div>
                <div className="h-3 bg-gray-700 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center mb-6">
        <i className="fab fa-github text-2xl cyber-blue mr-3"></i>
        <h3 className="text-xl font-semibold">Latest Repositories</h3>
        <div className="ml-auto text-xs text-gray-400">
          Updated: {feeds.length > 0 ? formatTimeAgo(feeds[0].lastUpdated) : 'Never'}
        </div>
      </div>
      
      <div className="space-y-4">
        {feeds.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <i className="fab fa-github text-4xl mb-4 block"></i>
            <p>No repositories found. GitHub feeds will update automatically.</p>
          </div>
        ) : (
          feeds.slice(0, 3).map((repo) => {
            const metadata = repo.metadata ? JSON.parse(repo.metadata) : {};
            return (
              <div key={repo.id} className="border border-white/10 rounded-lg p-4 hover:border-[hsl(var(--cyber-blue))]/50 transition-all duration-300">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold cyber-blue hover:underline cursor-pointer">
                    <a href={repo.url} target="_blank" rel="noopener noreferrer">
                      {repo.title}
                    </a>
                  </h4>
                  <span className="text-xs text-gray-400">
                    {formatTimeAgo(repo.publishedAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-3">{repo.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span><i className="fas fa-star"></i> {metadata.stars || 0}</span>
                  <span><i className="fas fa-code-branch"></i> {metadata.forks || 0}</span>
                  {metadata.language && (
                    <span className="cyber-purple">{metadata.language}</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="mt-6 text-center">
        <a 
          href="https://github.com/DURAI0706" 
          target="_blank" 
          rel="noopener noreferrer"
          className="cyber-blue hover:text-cyan-400 transition-colors"
        >
          View All Repositories <i className="fas fa-external-link-alt ml-1"></i>
        </a>
      </div>
    </div>
  );
}

function MediumFeed({ feeds, isLoading }: { feeds: SocialFeed[]; isLoading: boolean }) {
  const formatTimeAgo = (date: string | Date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} weeks ago`;
  };

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center mb-6">
          <i className="fab fa-medium text-2xl cyber-blue mr-3"></i>
          <h3 className="text-xl font-semibold">Latest Articles</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-white/10 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded mb-3 w-3/4"></div>
              <div className="flex space-x-4">
                <div className="h-3 bg-gray-700 rounded w-16"></div>
                <div className="h-3 bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
      <div className="flex items-center mb-6">
        <i className="fab fa-medium text-2xl cyber-blue mr-3"></i>
        <h3 className="text-xl font-semibold">Latest Articles</h3>
        <div className="ml-auto text-xs text-gray-400">
          Updated: {feeds.length > 0 ? formatTimeAgo(feeds[0].lastUpdated) : 'Never'}
        </div>
      </div>
      
      <div className="space-y-4">
        {feeds.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <i className="fab fa-medium text-4xl mb-4 block"></i>
            <p>No articles found. Medium feeds will update automatically.</p>
          </div>
        ) : (
          feeds.slice(0, 3).map((article) => (
            <div key={article.id} className="border border-white/10 rounded-lg p-4 hover:border-[hsl(var(--cyber-blue))]/50 transition-all duration-300">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold cyber-blue hover:underline cursor-pointer">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h4>
                <span className="text-xs text-gray-400">
                  {formatTimeAgo(article.publishedAt)}
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-3">{article.description}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <span><i className="fas fa-heart"></i> --</span>
                <span><i className="fas fa-comment"></i> --</span>
                <span>-- min read</span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="mt-6 text-center">
        <a 
          href="https://medium.com/@duraisamyr0706" 
          target="_blank" 
          rel="noopener noreferrer"
          className="cyber-blue hover:text-cyan-400 transition-colors"
        >
          Read All Articles <i className="fas fa-external-link-alt ml-1"></i>
        </a>
      </div>
    </div>
  );
}
