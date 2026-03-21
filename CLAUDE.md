# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular 16 educational learning platform (Qaroo) for multi-modal student learning with support for school and competitive exam programs. Deployed on Netlify.

## Commands

```bash
ng serve              # Dev server at localhost:4200
ng build              # Production build (output: dist/angular)
ng test               # Run Karma/Jasmine tests in Chrome
ng build --watch --configuration development  # Watch mode build
```

## Architecture

**Lazy-loaded feature modules** connected via Angular Router:

- `StudentOverallModelModule` — Main dashboard/landing, aggregates other modules
- `StudentEntryModelModule` — Dual-mode registration/login (single form handles both flows)
- `StudentClassModelModule` — Program/class selection
- `StudentExpolringModelModule` — Browse available programs
- `StudentContactModelModule` — Contact form
- `UserDetailsModule`, `ForgotPasswordModule`, `ResetPasswordModule` — User account flows

**Shared module** (`src/app/shared/`) contains:
- **Services:** `UserService` (auth/password ops), `ConfigurationService` (env-based API URL), `DynamicCardService` (program card generation with metadata mapping), `NotificationService` (custom toast notifications via vanilla DOM manipulation)
- **Components:** `StudentDetailsDialogComponent`, `DemoClassDialogComponent`, `DynamicCardSectionComponent`, `TwoCardRowComponent`

**API:** Backend at `localhost:5000/api/` with endpoints under `/auth/` (signup, login, forgot-password, reset-password). Environment configs in `src/environments/`.

## Code Conventions

- Component prefix: `app-`
- 2-space indentation, UTF-8, single quotes for TypeScript (see `.editorconfig`)
- Strict TypeScript mode enabled with Angular strict templates
- Reactive forms (FormBuilder/FormGroup) for all form handling
- Services use `providedIn: 'root'` singleton pattern
- No linter or Prettier configured
