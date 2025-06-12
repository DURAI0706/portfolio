import { contacts, socialFeeds, users, type User, type InsertUser, type Contact, type InsertContact, type SocialFeed, type InsertSocialFeed } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getSocialFeeds(source?: string): Promise<SocialFeed[]>;
  createSocialFeed(feed: InsertSocialFeed): Promise<SocialFeed>;
  updateSocialFeeds(feeds: InsertSocialFeed[]): Promise<void>;
  clearSocialFeeds(source: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private socialFeeds: Map<number, SocialFeed>;
  private currentUserId: number;
  private currentContactId: number;
  private currentFeedId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.socialFeeds = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentFeedId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getSocialFeeds(source?: string): Promise<SocialFeed[]> {
    const feeds = Array.from(this.socialFeeds.values());
    if (source) {
      return feeds.filter(feed => feed.source === source);
    }
    return feeds.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async createSocialFeed(insertFeed: InsertSocialFeed): Promise<SocialFeed> {
    const id = this.currentFeedId++;
    const feed: SocialFeed = { 
      ...insertFeed, 
      id, 
      lastUpdated: new Date() 
    };
    this.socialFeeds.set(id, feed);
    return feed;
  }

  async updateSocialFeeds(feeds: InsertSocialFeed[]): Promise<void> {
    for (const feed of feeds) {
      await this.createSocialFeed(feed);
    }
  }

  async clearSocialFeeds(source: string): Promise<void> {
    for (const [id, feed] of this.socialFeeds.entries()) {
      if (feed.source === source) {
        this.socialFeeds.delete(id);
      }
    }
  }
}

export const storage = new MemStorage();
