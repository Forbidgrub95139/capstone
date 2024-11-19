// src/pages/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import InfiniteScrollFragrances from '../components/InfiniteScrollFragrances';

// Home Component
// This component renders the home page of the Scentopedia website. It includes sections with background images and content that welcomes users, allows them to explore fragrances, and invites them to join the community.
const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      {/* Section 1: Background Image */}
      <div className="bg-[url('/parfums-de-marly-layton-featured-image-1024x640.png.jpeg')] bg-cover bg-no-repeat bg-center w-full min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-white text-center mt-28 font-title text-8xl">
          Welcome to the world of fragrance
        </h1>
        <div className="py-10">
          <p className="text-white text-center text-8xl pb-10 font-title">
            Find the scent for you
          </p>
          <div className="text-center mt-8">
            <Link to="/fragrances">
              <button
                className="bg-white text-black font- py-4 px-8 rounded-none font-title text-xl hover:bg-gray-200 transition duration-300 ease-in-out"
              >
                Find a Fragrance
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Section 2: New Background with Content and Fragrance Cards Scrolling */}
      <div className="w-full min-h-screen bg-gray-100 pt-20">
        <h2 className="text-black font-title text-center text-5xl py-10">
          Discover More Fragrances
        </h2>
        <p className="text-black text-center font-body max-w-3xl mx-auto text-2xl ">
          Explore our wide collection of fragrances. Find something that suits your style and personality.
        </p>
        <InfiniteScrollFragrances />
      </div>

      {/* Section 3: Additional Content */}
      <div className="w-full min-h-screen bg-black">
        <h2 className="text-white text-center font-title text-5xl py-20">
          Join the Scentopedia Community
        </h2>
        <p className="text-white text-center max-w-3xl font-body mx-auto text-2xl pb-10">
          Become part of a community that shares your passion for fragrances. Discover new scents, share your experiences, and connect with others.
        </p>
      </div>
    </div>
  );
};

export default Home;

/*
Documentation Summary:
- `Home` is a React functional component that renders the main landing page for the Scentopedia website.
- It contains three main sections:
  1. **Section 1**: A background image with a welcoming message and a button that directs users to the "Find a Fragrance" page.
  2. **Section 2**: A background with a scrollable list of fragrances, allowing users to discover more scents.
  3. **Section 3**: An invitation to join the Scentopedia community, highlighting the benefits of being a part of the fragrance enthusiast group.
- The component uses the `InfiniteScrollFragrances` component to display an infinite scrolling list of fragrance cards.
*/
