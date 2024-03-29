<template>
  <div class="container">
    <app-header />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRuntimeConfig, useAppConfig } from "nuxt/app";
import { useServerSeoMeta, useServerHead } from "@unhead/vue";
const runtime = useRuntimeConfig();
const route = useRoute();
const appConfig = useAppConfig();

const canonical = route.path + runtime.public.url;

useServerSeoMeta({
  title: "Nuxt Multi Tenant",
  description: "Multi-tenancy Nuxt sites support by sub-domains",
  robots: "index,follow",

  ogUrl: canonical,
  ogSiteName: "Nuxt Multi Tenant",
});

useServerHead({
  link: [
    {
      rel: "canonical",
      href: canonical,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: appConfig.author.name,
        jobTitle: "Founder",
      }),
    },
    {
      key: "GTM",
      async: true,
      src: "https://www.googletagmanager.com/gtag/js?id=G-SPYZPSKBM8",
    },
    {
      key: "GTAG-CONFIG",
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-SPYZPSKBM8');
          `,
    },
  ],
});
</script>

<style lang="css">
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 16px;
  background-color: #f4f4f5;
  margin: 0;
  padding: 0;
  color: #18181b;
  overflow-y: scroll;
}

html {
  box-sizing: border-box;
  font-size: 16px;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol,
ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}

a {
  color: #18181b;
  text-decoration: none;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 0.5rem;
}

.prose {
  font-size: 1rem;
  line-height: 1.75;
}

.prose :where(p) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

.prose :where([class~="lead"]) {
  color: #4b5563;
  font-size: 1.25em;
  line-height: 1.6;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}

.prose :where(a) {
  color: #111827;
  text-decoration: underline;
  font-weight: 500;
}

.prose :where(strong) {
  color: #111827;
  font-weight: 600;
}

.prose :where(a strong),
.prose :where(blockquote strong),
.prose :where(thead th strong) {
  color: inherit;
}

.prose :where(ol) {
  list-style-type: decimal;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.625em;
}

.prose :where(ol[type="A"]) {
  list-style-type: upper-alpha;
}

.prose :where(ol[type="a"]) {
  list-style-type: lower-alpha;
}

.prose :where(ol[type="A s"]) {
  list-style-type: upper-alpha;
}

.prose :where(ol[type="a s"]) {
  list-style-type: lower-alpha;
}

.prose :where(ol[type="I"]) {
  list-style-type: upper-roman;
}

.prose :where(ol[type="i"]) {
  list-style-type: lower-roman;
}

.prose :where(ol[type="I s"]) {
  list-style-type: upper-roman;
}

.prose :where(ol[type="i s"]) {
  list-style-type: lower-roman;
}

.prose :where(ol[type="1"]) {
  list-style-type: decimal;
}

.prose :where(ul) {
  list-style-type: disc;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.625em;
}

.\[\&\>\:not\(figure\)\]\:prose > :not(figure) :where(ol > li)::marker,
.prose :where(ol > li)::marker {
  font-weight: 400;
  color: #6b7280;
}

.\[\&\>\:not\(figure\)\]\:prose > :not(figure) :where(ul > li)::marker,
.prose :where(ul > li)::marker {
  color: #d1d5db;
}

.prose :where(hr) {
  border-color: #e5e7eb;
  border-top-width: 1px;
  margin-top: 3em;
  margin-bottom: 3em;
}

.prose :where(blockquote) {
  font-weight: 500;
  font-style: italic;
  color: #111827;
  border-left-width: 0.25rem;
  border-left-color: #e5e7eb;
  quotes: "“" "”" "‘" "’";
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-left: 1em;
}
</style>
