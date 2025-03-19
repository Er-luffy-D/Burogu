import { RevealOnView } from "./Animation";

const TestimonialCard = ({
  href,
  name,
  title,
  content,
}: {
  href: string;
  name: string;
  title: string;
  content: string;
}) => (
  <li className="text-sm leading-6">
    <div className="relative group">
      <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-blue-400 to-green-400 dark:from-purple-600 dark:to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
      <a href={href} className="cursor-pointer">
        <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-300 dark:bg-slate-800 dark:ring-gray-900/5 shadow-lg dark:shadow-none">
          <div className="flex items-center space-x-4">
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                {name}
              </h3>
              <p className="text-gray-700 text-md dark:text-gray-500">
                {title}
              </p>
            </div>
          </div>
          <p className="leading-normal text-gray-600 text-md dark:text-gray-300">
            {content}
          </p>
        </div>
      </a>
    </div>
  </li>
);

export const Testimonial = () => {
  return (
    <div className="py-20 bg-gray-100 dark:bg-slate-900">
      <div className="max-w-6xl mx-8 md:mx-10 lg:mx-20 xl:mx-auto">
        <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
          <div className="mb-12 space-y-5 md:mb-16 md:text-center">
            <RevealOnView>
              <div className="inline-block px-3 py-1 text-sm font-semibold text-indigo-900 rounded-lg md:text-center text-cn bg-[#e0e7ff] dark:text-indigo-100 dark:bg-[#202c47] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
                Words from Others
              </div>
            </RevealOnView>
            <RevealOnView>
              <h1 className="mb-5 text-3xl font-semibold text-black dark:text-white md:text-center md:text-5xl">
                It's not just us.
              </h1>
            </RevealOnView>
            <RevealOnView>
              <p className="text-xl text-gray-800 dark:text-gray-100 md:text-center md:text-2xl">
                Here's what others have to say about us.
              </p>
            </RevealOnView>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <ul className="space-y-8">
            <RevealOnView>
              <TestimonialCard
                href="https://twitter.com/johndoe"
                name="John Doe"
                title="Blogger & Content Creator"
                content="This blogging platform has transformed the way I share my ideas."
              />
            </RevealOnView>
            <RevealOnView>
              <TestimonialCard
                href="https://twitter.com/janedoe"
                name="Jane Doe"
                title="Travel Blogger"
                content="The user experience is fantastic and intuitive."
              />
            </RevealOnView>
          </ul>

          <ul className="hidden space-y-8 sm:block">
            <RevealOnView>
              <TestimonialCard
                href="https://twitter.com/alexsmith"
                name="Alex Smith"
                title="Food Blogger"
                content="The design tools are incredibly powerful and easy to use. I can create stunning visuals for my food blog, which has greatly impressed my audience."
              />
            </RevealOnView>
            <RevealOnView>
              <TestimonialCard
                href="https://twitter.com/markjohnson"
                name="Mark Johnson"
                title="Tech Enthusiast"
                content="The platform's customization options allow me to create a unique look and feel for my tech blog. The support team is always available to help with any issues, making it a hassle-free experience."
              />
            </RevealOnView>
          </ul>

          <ul className="hidden space-y-8 lg:block">
            <RevealOnView>
              <TestimonialCard
                href="https://twitter.com/michaelbrown"
                name="Michael Brown"
                title="Tech Blogger"
                content="Nice Website."
              />
            </RevealOnView>
            <RevealOnView>
              <TestimonialCard
                href="https://twitter.com/sarahwilson"
                name="Sarah Wilson"
                title="Health & Wellness Blogger"
                content="The technical support team is always responsive and helpful."
              />
            </RevealOnView>
          </ul>
        </div>
      </div>
    </div>
  );
};
