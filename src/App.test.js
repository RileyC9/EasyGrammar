import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event";
import DefinitionList from "./components/DefinitionList";

describe("DefinitionList component", () => {

  // Test case: Renders definition list if there is no error
  test("renders definition list if there is no error", () => {

    // Mock data for a successful fetch response
    const definition = [
      {
        word: "example",
        meanings: [
          {
            definitions: [{ definition: "a thing characteristic of its kind" }],
          },
        ],
        phonetics: [{ text: "/ɪɡˈzæmpəl/", audio: "example_audio.mp3" }],
      },
    ];

    // Render the DefinitionList component with mocked data
    render(<DefinitionList definition={definition} />);

    // Find elements rendered by the component and assert their presence
    const wordElement = screen.getByText("example");
    const definitionElement = screen.getByText(
      /a thing characteristic of its kind/
    );
    const phoneticElement = screen.getByText("/ɪɡˈzæmpəl/");

    expect(wordElement).toBeInTheDocument();
    expect(definitionElement).toBeInTheDocument();
    expect(phoneticElement).toBeInTheDocument();
  });

  // Test case: Renders error message if there is an error on fetch
  test("renders error message if there is an error on fetch", () => {

    // Mocked data for an erorr response
    const errorDefinition = [
      {
        error: "Not found",
      },
    ];

    // Render the DefinitionList component with mocked error data
    render(<DefinitionList definition={errorDefinition} />);

    // Find and assert the presence of the error message element
    const errorMessage = screen.getByText(
      "No results found, please check your spelling"
    );

    expect(errorMessage).toBeInTheDocument();
  });

  // Test case: Renders audio button if there is an audio link
  it('renders audio button if there is an audio link', () => {
    // Render the DefinitionList component with a sample definition containing an audio link
    render(
      <DefinitionList
        definition={[
          {
            word: 'example',
            phonetics: [
              {
                text: '/ɪɡˈzæmpəl/',
                audio: 'https://www.example.com/audio.mp3',
              },
            ],
            meanings: [
              {
                partOfSpeech: 'noun',
                definitions: [
                  {
                    definition: 'a thing characteristic of its kind or illustrating a general rule.',
                  },
                ],
              },
            ],
          },
        ]}
      />
    );

    // Check if the audio button is rendered
    const audioButton = screen.getByTestId('audio-button');
    expect(audioButton).toBeInTheDocument();
  });

  // Test case: Renders audio button even if there is an error or no audio link fetched
  it('renders audio button even if there is an error or no audio link fetched', () => {
    // Render the DefinitionList component with an error definition
    render(
      <DefinitionList
        definition={[
          {
            error: 'No results found',
          },
        ]}
      />
    );

    // Check that the audio button is not present when there is an error or no audio link fetched
    const audioButton = screen.queryByTestId('audio-button');
    expect(audioButton).not.toBeInTheDocument();
  });
});
