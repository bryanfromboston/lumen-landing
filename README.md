This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About Exit Intent

The purpose of this prototype is to illustrate a configurable and responsive method to gracefully attempt to prevent engaged site exit from an otherwise engaged visitor.

### Background

The purpose of an exit intent interrupt is to present **engaged** users with a piece of content or an offer they might otherwise have missed given the amount of information presented to them on the main page.

The success criteria is not to display the exit intent experience to *every* user. Only users who have shown some interest in the page in some way (in our case, we use page depth and time on size to indicate engagement) and then make some explicit action to attempt to leave the page should be shown.

Otherwise, we could unintentially  interrupt a visitor's natural behavioral flow, introducing more friction, rather than adding value to their visit.

### Determining Exit Intent

In order to determine to whom to *display* the exit intent experience, we rely on to configurable elements:

* The visitor should be on the page for a predetermined amount of time (by default 10 seconds)
* The visitor scrolls a pre-determined percentage of the page during the page visit (by default, 30%)

Only after the visitor has met **both** conditions above are they "eligible" to see the exit intent toast.

### Displaying the exit intent toast


#### For desktop users

Desktop (or other non-touch widescreen devices) users who meet the above conditions are identified as about to exit in two ways:

* They rapidly move their cursor to within a pre-determined distance from the top of the browser chrome (in this case, 10 pixels), indicating that they are likely about to hit the back button or close the browser tab, or
* The move their cursor outside of the browser window, indicating that they are about to give focus to another window other than the chrome.

#### For mobile users

Mobile (or any touch-enabled devices) do not have a cursor to use (in most cases). Therefore, we use a rapid scroll (here called `scroll velocity`). If the visitors scrolls up (toward the search or browser bar) on both Android and Apple devices, it's very likely that they are intending to exit the page, close the tab, etc. In our example, the `scrollVelocity` is set to 50px per scroll event.

In addition, we provide a CTA bar instead of the full toast for mobile users for a more elegant experience.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.