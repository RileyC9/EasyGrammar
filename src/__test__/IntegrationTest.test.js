import React from "react";
import { getByTestId, render, screen, waitFor, getByText, fireEvent } from "@testing-library/react";
import { Route, MemoryRouter, Routes } from "react-router-dom";
import mockAxios from "axios"
import Main from "../components/main"
import { wordSubmit } from "../components/main"
import DefinitionList from "../components/DefinitionList";


describe("Integration test:", () => {
  it("Search a word and display definition list component", async () => {
    const { getByTestId, getByPlaceholderText, getByTitle } = render(
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route
            path="/home"
            element={<Main />}
          />
        </Routes>
      </MemoryRouter>
    )
    const searchInput = screen.getByPlaceholderText("Type to search a word...");
    const searchButton = screen.getByTitle("Get definition and AI generated image");

    fireEvent.change(searchInput, { target: { value: "innovation" } });
    fireEvent.submit(searchButton);

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    let definitionListDisplay;
    setTimeout(() => {
      definitionListDisplay = screen.getByText("The act of innovating; the introduction of something new, in customs, rites, etc.");
      expect(definitionListDisplay).toBeInTheDocument();
    }, 3000);
  })

  test('renders error message when there is an error in fetching definition', async () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <Routes>
          <Route
            path="/home"
            element={<Main />}
          />
        </Routes>
      </MemoryRouter>
    )

    const searchInput = screen.getByPlaceholderText("Type to search a word...");
    const searchButton = screen.getByTitle("Get definition and AI generated image");
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          error: ['Word not found']
        }
      })
    );
    fireEvent.change(searchInput, { target: { value: "innovation" } });
    fireEvent.submit(searchButton);

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    setTimeout(() => {
      expect(screen.getByText('No results found, please check your spelling')).toBeInTheDocument();
    }, 3000);
  });
})


describe('Audio Feature Integration Tests:', () => {
  it('Should fetch and display audio pronunciation when a word is searched', async () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path="/home" element={<Main />} />
        </Routes>
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Type to search a word...');
    const searchButton = screen.getByTitle('Get definition and AI generated image');

    fireEvent.change(searchInput, { target: { value: 'innovation' } });
    fireEvent.submit(searchButton);

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    setTimeout(() => {
      const audioElement = screen.getByTestId('audio-button');
      expect(audioElement.src).toBe('mock-audio-url');
    }, 3000);
  });

  // it('Should display an error message when audio pronunciation is not available for the word', async () => {

  //   render(
  //     <MemoryRouter initialEntries={['/home']}>
  //       <Routes>
  //         <Route path="/home" element={<Main />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   const searchInput = screen.getByPlaceholderText('Type to search a word...');
  //   const searchButton = screen.getByTitle('Get definition and AI generated image');

  //   fireEvent.change(searchInput, { target: { value: 'innovation' } });
  //   fireEvent.submit(searchButton);

  //   await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
  //   setTimeout(() => {
  //     const errorMessage = await screen.findByText('Audio pronunciation not available');
  //     expect(errorMessage).toBeInTheDocument();
  //   }, 3000);
  // });
});
