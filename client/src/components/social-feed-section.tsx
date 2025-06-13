import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { SocialFeed } from '@shared/schema';

interface SocialFeedResponse {
  success: boolean;
  feeds: SocialFeed[];
}

export default function SocialFeedSection() {
  const queryClient = useQueryClient();

  const { data: githubData, isLoading: githubLoading } = useQuery<SocialFeedResponse>({
    queryKey: ['/api/social-feeds', { source: 'github' }],
    queryFn: () => fetch('/api/social-feeds?source=github').then(res => res.json()),
  });

  const { data: mediumData, isLoading: mediumLoading } = useQuery<SocialFeedResponse>({
    queryKey: ['/api/social-feeds', { source: 'medium' }],
    queryFn: () => fetch('/api/social-feeds?source=medium').then(res => res.json()),
  });

  const updateGithubMutation = useMutation({
    mutationFn: () => fetch('/api/update-github', { method: 'POST' }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/social-feeds', { source: 'github' }] });
    },
  });

  const updateMediumMutation = useMutation({
    mutationFn: () => fetch('/api/update-medium', { method: 'POST' }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/social-feeds', { source: 'medium' }] });
    },
  });

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

    updateFeeds();
    const interval = setInterval(updateFeeds, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const githubFeeds = githubData?.feeds || [];
  const mediumFeeds = mediumData?.feeds || [];

  return (
    <section className="relative z-10 py-20 px-6 bg-[hsl(210,100%,95%)/0.1]">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          Latest <span className="professional-blue">Updates</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <GitHubFeed feeds={githubFeeds} isLoading={githubLoading} />
          <MediumFeed feeds={mediumFeeds} isLoading={mediumLoading} />
        </div>
      </div>
    </section>
  );
}

function FeedCard({ icon, title, feeds, isLoading, type }: any) {
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

  return (
    <div className="bg-[hsl(210,100%,95%)/0.1] backdrop-blur-xl rounded-xl p-6 border border-blue-200/20">
      <div className="flex items-center mb-6">
        <i className={`${icon} text-2xl text-cyan-500 mr-3`}></i>
        <h3 className="text-xl font-semibold text-blue-900">{title}</h3>
        <div className="ml-auto text-xs text-gray-500">
          Updated: {feeds.length > 0 ? formatTimeAgo(feeds[0].lastUpdated) : 'Never'}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="border border-blue-200/20 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-3 w-3/4"></div>
              <div className="flex space-x-4">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      ) : feeds.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <i className={`${icon} text-4xl mb-4 block`}></i>
          <p>No updates found. Feeds will update automatically.</p>
        </div>
      ) : (
        feeds.slice(0, 3).map((item: SocialFeed) => {
          const metadata = item.metadata ? JSON.parse(item.metadata) : {};
          return (
            <div key={item.id} className="border border-blue-200/20 rounded-lg p-4 hover:border-cyan-400 transition-all duration-300">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-cyan-700 hover:underline cursor-pointer">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </h4>
                <span className="text-xs text-gray-500">{formatTimeAgo(item.publishedAt)}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                {type === 'github' ? (
                  <>
                    <span><i className="fas fa-star"></i> {metadata.stars || 0}</span>
                    <span><i className="fas fa-code-branch"></i> {metadata.forks || 0}</span>
                    {metadata.language && <span className="text-blue-700">{metadata.language}</span>}
                  </>
                ) : (
                  <>
                    <span><i className="fas fa-heart"></i> --</span>
                    <span><i className="fas fa-comment"></i> --</span>
                    <span>-- min read</span>
                  </>
                )}
              </div>
            </div>
          );
        })
      )}

      <div className="mt-6 text-center">
        <a 
          href={type === 'github' ? 'https://github.com/DURAI0706' : 'https://medium.com/@duraisamyr0706'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-700 hover:text-cyan-600 transition-colors"
        >
          {type === 'github' ? 'View All Repositories' : 'Read All Articles'} <i className="fas fa-external-link-alt ml-1"></i>
        </a>
      </div>
    </div>
  );
}

function GitHubFeed(props: any) {
  return <FeedCard {...props} icon="fab fa-github" title="Latest Repositories" type="github" />;
}

function MediumFeed(props: any) {
  return <FeedCard {...props} icon="fab fa-medium" title="Latest Articles" type="medium" />;
}
