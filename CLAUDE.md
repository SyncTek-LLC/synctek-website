# SyncTek Website - Governance & Contribution Rules

This repository (synctek-website) is the public website for SyncTek.io. It is governed by BusinessAtlas. All work must follow the BusinessAtlas governance framework.

## Governance Mandate

- All work in this repository MUST be tracked through a BusinessAtlas initiative (INIT-YYYY-NNN)
- Run `ba classify` in the BusinessAtlas repo before starting any work here
- Every code change requires gate approval before implementation begins
- All artifacts, decisions, and delegations are logged in BusinessAtlas ledgers

## PR-Based Merge Governance

- **QualityAtlas is the sole merge authority.** No other department or the CEO may merge to main/master.
- All work must be on feature branches - never push directly to main
- Create PRs when work is complete - QualityAtlas reviews and merges
- A `pr_approval` artifact is required before any initiative can close

## CEO Code-Write Prohibition

- The CEO (Atlas) may NOT write code files in any repository
- Code work must be delegated to the appropriate department (CodeAtlas, etc.)
- The CEO may only write governance, config, and state files (.md, .yaml, .json)

## Department Delegation

- Code changes: delegate to CodeAtlas
- Testing: delegate to TestAtlas
- Security review: delegate to SecurityAtlas
- Quality review and merges: QualityAtlas

## Reference

- Full governance rules: BusinessAtlas/EXECUTION_RUNBOOK.md
- Delegation config: BusinessAtlas/config/delegation.yaml
- Gate definitions: BusinessAtlas/config/gates.yaml
