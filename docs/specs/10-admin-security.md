# Phase 10 — Administration, Security, Preferences

**Targets:** `reference/06-users-administration.png`. Also, in `prototype/`: `26-admin-users`, `27-admin-permissions`, `28-add-user-modal`, `29-security`, `35-preferences-modal`.
**Prototype:** `ROUTES.admin`, `ROLES`, `TEAMC`, `roleGroup`, `addUserModal`, the actions `submitUser`, `userMenu2`, `setRole`, `deact`, `resend`, `permSw`, plus `ROUTES.security`, `logAudit`, the actions `secSw` and `newKey`, and `prefsModal`.

## Administration (`/admin`)

- **Layout:** two columns (2.3fr / 1fr). The page header sits inside the left column.
  - Eyebrow "Administration" in blue, normal case.
  - Title "Users & Administration", subtitle "Manage users, teams, roles and access controls for your organization."
- **CardTabs with icons:** Users, Teams, Roles, Permissions.
- **Users tab:**
  - **KPIs:** Total Users 24 (↑3 this month, plus any added), Teams 5 ("No change"), Roles 8 (↑1 this month), Permission Sets 12 (↑2 this month).
  - **Users** card. Header: "Search users…", All Teams, All Roles, and "+ Add User".
  - **Table:** checkbox, avatar and name, email, team, role, status pill (Active, Pending, Inactive), last login ("Invite sent" for Pending), actions menu.
  - 10 per page with pagination.
  - **Actions menu:**
    - Change role: list of the 8 roles, with a check on the current one
    - Resend invite (Pending only), which toasts "In this demo no email is sent."
    - Deactivate / Reactivate
  - **Recent Activity** table: time, user, action with an icon tile, details. Newest 6.
- **Teams tab:** team avatar (`TEAMC` color), members, lead, equipment access.
- **Roles tab:** icon, role, description, users, permission sets.
- **Permissions tab:** matrix of 8 permissions × 6 roles with switches. The defaults are as in the prototype; each change writes an audit entry.
- **Right column:**
  - **Teams:** 5, with member counts.
  - **Roles:** 6, with user counts. "Quality Manager" counts under Operations Manager.
  - **Access Control** 2×2 grid:
    - Facility Access: 3 facilities
    - Equipment Access: 24 equipment types
    - Data Permissions: 5 data sources
    - AI Permissions: 4 permission sets
- **Add User** modal:
  - Fields: full name, email (type email), team, role.
  - The note "In this demo no email is sent."
  - The user is added as Pending at the top, with an audit entry and the toast "{name} added · invitation pending".

## Security (`/security`)

- **Header:** eyebrow "SECURITY", title "Security", subtitle "Sign-in, access policies, data retention and a full audit trail."
- **Six cards** (3 columns):
  - Single Sign-On: Microsoft Entra ID, connected.
  - Multi-factor Authentication: switch, "Enforced for all users".
  - Session Timeout: select.
  - IP Allow-list: switch.
  - Data Retention: select.
  - API Keys: list, and "Create key". Creating a key shows a modal with the key once, a Copy button and "This is a demo key and does not grant access to anything."
- **Audit Log** table: every audit entry, newest first. Changes made on any page in this session appear here.

## Preferences modal (user menu → Preferences)

- Currency: USD / QAR / AED Segmented, with the fixed-rates note.
- Units: "Metric" pill.
- Time zone: the device time zone, from `Intl`.

## Done when

- [ ] `/admin` matches `reference/06-users-administration.png`: the same 10 users on page 1 (with `@gulfcrest.example` emails), the same teams, roles and access tiles. Access Control shows 3 facilities, by design.
- [ ] Add user, role change, deactivate, permission toggles and security changes all write to Recent Activity and the Audit Log, and persist.
- [ ] Build and lint pass.
