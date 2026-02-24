import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";
import { MiwahdissFilter } from "@/components/management/miwahdiss/miwahdiss-filter";
import { MiwahdissCard } from "@/components/management/miwahdiss/miwahdiss-card";
import type { Miwahdiss as MiwahdissType } from "@/types/miwahdiss.type";

const DUMMY_DATA: MiwahdissType[] = [
  {
    id: "1",
    title: "Birthday party",
    description:
      "Celebrate birthdays in style with custom T-shirts made for the whole group. From kids' parties to ...",
    image:
      "https://images.unsplash.com/photo-1631857455684-a54a2f03665f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-03-20",
  },
  {
    id: "2",
    title: "Corporate Event",
    description:
      "Make your corporate event memorable with branded merchandise. Perfect for team building...",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&auto=format&fit=crop&q=60",
    createdAt: "2024-03-21",
  },
  {
    id: "3",
    title: "Wedding",
    description:
      "Create custom wedding favors and gifts for your special day. Personalized for you and your guests.",
    image:
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-03-22",
  },
  {
    id: "4",
    title: "Music Festival",
    description:
      "Get ready for the festival season with custom band merch and festival gear.",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-03-23",
  },
];

const Miwahdiss = () => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="All Events"
          description="Manage and organize your upcoming events and activities."
        />
        <MiwahdissFilter />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {DUMMY_DATA.map((item) => (
          <MiwahdissCard key={item.id} item={item} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Miwahdiss;
