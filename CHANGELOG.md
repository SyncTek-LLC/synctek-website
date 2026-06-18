# Changelog

All notable changes to synctek.io are documented here.

## [Unreleased]

### Added
- **Heka waitlist confirmation email** (`functions/api/waitlist.ts`): Resend-backed transactional email sent immediately after a new D1 insert. Fire-and-forget (non-blocking); missing key or Resend outage never breaks signup. Optional `WAITLIST_NOTIFY` env var for internal founder-ping per signup. Duplicate signups (ON CONFLICT path) intentionally receive no email.

## [2026-06-17]

### Added
- Heka launch page and waitlist with Cloudflare D1 persistence
- Heka nav link alongside SimDrive
- D1 binding wired in `wrangler.toml` (`WAITLIST_DB`)
