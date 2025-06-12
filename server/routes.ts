import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertSocialFeedSchema } from "@shared/schema";
import { z } from "zod";

// GitHub API types
interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  created_at: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

// Medium RSS types
interface MediumPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          error: "Invalid contact data", 
          details: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: "Failed to save contact message" 
        });
      }
    }
  });

  // Get social feeds endpoint
  app.get("/api/social-feeds", async (req, res) => {
    try {
      const source = req.query.source as string | undefined;
      const feeds = await storage.getSocialFeeds(source);
      res.json({ success: true, feeds });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch social feeds" 
      });
    }
  });

  // Update GitHub repositories
  app.post("/api/update-github", async (req, res) => {
    try {
      const githubToken = process.env.GITHUB_TOKEN || process.env.GITHUB_API_KEY || "";
      const githubUsername = "DURAI0706";
      
      const headers: Record<string, string> = {
        'User-Agent': 'Portfolio-App'
      };
      
      if (githubToken) {
        headers['Authorization'] = `token ${githubToken}`;
      }

      const response = await fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const repos: GitHubRepo[] = await response.json();
      
      // Clear existing GitHub feeds
      await storage.clearSocialFeeds('github');
      
      // Add new feeds
      const feeds = repos.map(repo => ({
        source: 'github' as const,
        title: repo.name,
        description: repo.description || '',
        url: repo.html_url,
        publishedAt: new Date(repo.updated_at),
        metadata: JSON.stringify({
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          created: repo.created_at
        })
      }));

      await storage.updateSocialFeeds(feeds);
      
      res.json({ 
        success: true, 
        message: `Updated ${feeds.length} GitHub repositories`,
        feeds 
      });
    } catch (error) {
      console.error('GitHub update error:', error);
      res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to update GitHub feeds" 
      });
    }
  });

  // Update Medium articles
  app.post("/api/update-medium", async (req, res) => {
    try {
      const mediumUsername = "duraisamyr0706";
      const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
      
      const response = await fetch(rssUrl);
      if (!response.ok) {
        throw new Error(`Medium RSS error: ${response.status} ${response.statusText}`);
      }

      const rssText = await response.text();
      
      // Simple RSS parsing - extract items between <item> tags
      const itemRegex = /<item>([\s\S]*?)<\/item>/g;
      const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>/;
      const descRegex = /<description><!\[CDATA\[(.*?)\]\]><\/description>/;
      const linkRegex = /<link>(.*?)<\/link>/;
      const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/;
      const guidRegex = /<guid.*?>(.*?)<\/guid>/;

      const posts: MediumPost[] = [];
      let match;
      
      while ((match = itemRegex.exec(rssText)) !== null && posts.length < 6) {
        const itemContent = match[1];
        
        const titleMatch = titleRegex.exec(itemContent);
        const descMatch = descRegex.exec(itemContent);
        const linkMatch = linkRegex.exec(itemContent);
        const pubDateMatch = pubDateRegex.exec(itemContent);
        const guidMatch = guidRegex.exec(itemContent);
        
        if (titleMatch && linkMatch && pubDateMatch) {
          posts.push({
            title: titleMatch[1],
            description: descMatch?.[1] || '',
            link: linkMatch[1],
            pubDate: pubDateMatch[1],
            guid: guidMatch?.[1] || linkMatch[1]
          });
        }
      }
      
      // Clear existing Medium feeds
      await storage.clearSocialFeeds('medium');
      
      // Add new feeds
      const feeds = posts.map(post => ({
        source: 'medium' as const,
        title: post.title,
        description: post.description.substring(0, 200) + (post.description.length > 200 ? '...' : ''),
        url: post.link,
        publishedAt: new Date(post.pubDate),
        metadata: JSON.stringify({
          guid: post.guid
        })
      }));

      await storage.updateSocialFeeds(feeds);
      
      res.json({ 
        success: true, 
        message: `Updated ${feeds.length} Medium articles`,
        feeds 
      });
    } catch (error) {
      console.error('Medium update error:', error);
      res.status(500).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to update Medium feeds" 
      });
    }
  });

  // Auto-update endpoint (can be called by cron job)
  app.post("/api/update-all-feeds", async (req, res) => {
    try {
      const results = await Promise.allSettled([
        fetch(`${req.protocol}://${req.get('host')}/api/update-github`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }),
        fetch(`${req.protocol}://${req.get('host')}/api/update-medium`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      ]);

      const githubResult = results[0];
      const mediumResult = results[1];
      
      res.json({
        success: true,
        github: githubResult.status === 'fulfilled' ? 'success' : 'failed',
        medium: mediumResult.status === 'fulfilled' ? 'success' : 'failed',
        message: 'Feed update completed'
      });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: "Failed to update all feeds" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
