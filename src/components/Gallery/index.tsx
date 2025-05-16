import React from "react";
import UpdateCard from "./UpdateCard";

const Gallery: React.FC = () => {
  return (
    <section className="flex flex-col items-stretch items-center px-20 py-14 max-md:px-5 max-w-[1444px] mx-auto" aria-labelledby="latest-updates-heading">
      <h2 
        id="latest-updates-heading"
        className="text-[rgba(52,93,133,1)] text-[32px] font-semibold leading-none ml-2.5"
      >
        Latest Updates
      </h2>
      <div className="w-full mt-12 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-full max-md:w-full max-md:ml-0">
            <div className="w-full max-md:max-w-full max-md:mt-8">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
                <div className="w-full max-md:w-full max-md:ml-0">
                  <div className="bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.25)] border flex grow items-center gap-2.5 w-full p-2.5 rounded-[0px_28px_0px_28px] border-[rgba(222,234,237,1)] border-solid max-md:mt-3">
                    <div className="self-stretch min-w-60  my-auto">
                      <UpdateCard
                        image="https://cdn.builder.io/api/v1/image/assets/4ccc52d59fb54340b43b3652db0442b6/97f3bfc9e7e32638ff8308a056dc146908e32afd?placeholderIfAbsent=true"
                        title="New Release from CCDC
Lorem Ipsum Dolor Sit Amet Con"
                        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor adipisicing elit, sed do eiusmod tempor incididunt ut labore et do. "
                        readMoreColor="[rgba(118,231,221,1)]"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full max-md:w-full max-md:ml-0">
                  <div className="bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.25)] border flex grow items-center gap-2.5 w-full p-2.5 rounded-[0px_28px_0px_28px] border-[rgba(222,234,237,1)] border-solid max-md:mt-3">
                    <div className="self-stretch min-w-60  my-auto">
                      <UpdateCard
                        image="https://cdn.builder.io/api/v1/image/assets/4ccc52d59fb54340b43b3652db0442b6/97f3bfc9e7e32638ff8308a056dc146908e32afd?placeholderIfAbsent=true"
                        title="New Release from CCDC
Lorem Ipsum Dolor Sit Amet Con"
                        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor adipisicing elit, sed do eiusmod tempor incididunt ut labore et do. "
                        readMoreColor="[rgba(118,231,221,1)]"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full max-md:w-full max-md:ml-0">
                  <div className="bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.25)] border flex grow items-center gap-2.5 w-full p-2.5 rounded-[0px_28px_0px_28px] border-[rgba(222,234,237,1)] border-solid max-md:mt-3">
                    <div className="self-stretch min-w-60  my-auto">
                      <UpdateCard
                        image="https://cdn.builder.io/api/v1/image/assets/4ccc52d59fb54340b43b3652db0442b6/97f3bfc9e7e32638ff8308a056dc146908e32afd?placeholderIfAbsent=true"
                        title="New Release from CCDC
Lorem Ipsum Dolor Sit Amet Con"
                        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor adipisicing elit, sed do eiusmod tempor incididunt ut labore et do. "
                        readMoreColor="[rgba(118,231,221,1)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;