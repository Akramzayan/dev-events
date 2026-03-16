
import { events } from "@/lib/constant";
import EventCard from "./components/EventCard";
import ExploreBtn from "./components/exploreBtn";

export default function Home() {
  return (
    <section>
     <h1 className="text-center">The Hub For every Dev <br /> Event</h1>
     <p className="text-center mt-5">Discover and share events, workshops, and conferences in the tech industry.</p>
     <ExploreBtn/>
     <div className="mt-20 space-y-7">
      <h3>Featured Events</h3>
      <ul className="events">
        {events.map((event)=> (
          <li key={event.title}>
            <EventCard title={event.title} image={event.image} slug={event.slug} location={event.location} date={event.date} time={event.time} />
          </li>
        ))}
      </ul>

     </div>
     
    </section>
  );
}
