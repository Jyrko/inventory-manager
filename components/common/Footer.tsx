
"use client";
import { Footer } from "flowbite-react";

export default function FooterComponent() {
  return (
    <Footer container className="md:z-40 absolute bottom-0">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="https://flowbite.com"
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Flowbite Logo"
            name="Flowbite"
          />
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="Flowbite™" year={2024} />
      </div>
    </Footer>
  );
}
