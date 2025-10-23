"use client";
import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import EventsGrid from "@/components/EventsGrid/EventsGrid";

export default function Page() {
  return (
    <>
      <Nav />
      <EventsGrid />
      <ConditionalFooter />
    </>
  );
}
