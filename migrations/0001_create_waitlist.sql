-- Migration: 0001_create_waitlist
-- Creates the waitlist table for Heka email capture.
-- Apply via: wrangler d1 execute heka-waitlist --file=migrations/0001_create_waitlist.sql
-- DeployAtlas: run this after the WAITLIST_DB D1 database is created.

CREATE TABLE IF NOT EXISTS waitlist (
  email      TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  source     TEXT
);
