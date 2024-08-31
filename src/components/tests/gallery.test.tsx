import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Gallery from "../gallery/Gallery";
describe("Gallery", () => {
  test("displays images", () => {
    const images = {
      data: [
        {
          id: 1,
          title: "image1",
          gallery: { title: "efwef", thumbnail: "ewfwef" },
        },
        {
          id: 2,
          title: "image2",
          gallery: { title: "efwef", thumbnail: "ewfwef" },
        },
      ],
    };
    const { getByText } = render(<Gallery images={images} />);
  });
});
