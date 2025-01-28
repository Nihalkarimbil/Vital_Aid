"use client"

import Image from "next/image";
import React, { useEffect } from "react";
import Doctorimg from "../../../../public/Doctor.jpg"
import donorimg from "../../../../public/donor.jpg"
import equipment from "../../../../public/equipment2.jpeg"
import volunteer from "../../../../public/volunteer.jpg"
import Link from "next/link";
import Aos from "aos";

function Specialities() {
  
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);


  return (
    <div className="bg-white p-6">
      <h2 className="text-center text-3xl font-bold text-lime-500 mb-8">
        Our Specialities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-14 cursor-pointer">
        
        <div
          className="bg-sky-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-right"
        >
          <div>
            <Image
              src={Doctorimg}
              alt={"Meet Our Doctors"}

              className="rounded-t-lg w-full h-72 object-cover"
            />

            <div className="p-4" >
              <h3 className="text-lg font-semibold text-center text-lime-500" >
                Meet Our Doctors
              </h3>
            </div>
          </div>
        </div>

        <div
          className="bg-sky-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-right"
        >
          <Link href={"/blooddonors"}>
            <Image
              src={donorimg}
              alt={"Meet Our Donors"}

              className="rounded-t-lg w-full h-72 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-center text-lime-500">
                Meet Our Donors
              </h3>
            </div>
          </Link>

        </div>

        <div
          className="bg-sky-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-left"
        >
          <Link href={"/equi"}>
            <Image
              src={equipment}
              alt={"Request for Equipments"}
              className="rounded-t-lg w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-center text-lime-500">
                Request for Equipments
              </h3>
            </div>
          </Link>


        </div>
        <div
          className="bg-sky-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" data-aos="fade-left"
        >
          <Link href={"/mxmxm"}>
            <Image
              src={volunteer}
              alt={"Our Volunteers"}
              className="rounded-t-lg w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-center text-lime-500">
                Our Volunteers
              </h3>
            </div>
          </Link>

        </div>
        
      </div>
    </div>


  );
}

export default Specialities;
