import React from "react";
import { getByTestId, render, screen, waitFor, getByText, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from "./components/SearchInput";
import DefinitionList from "./components/DefinitionList";
import SampleSentences from "./components/SampleSentence";
import ImageUnite from "./components/ImageUnite";
// import fixPic from "./components/Image/fixPic.jpeg";
import Feedback from "./components/Feedback";
import { Route, MemoryRouter, Routes } from "react-router-dom";

/* SearchInput feature */
// Unit Test 1
// test to find if the search button exists in the SearchInput component
test('renders a search button', () => {
  render(<SearchInput />);

  // Use React Testing Library's queryByText to find the search button
  const searchButton = screen.queryByRole('button', { name: /Search/i });

  // Assert that the search button exists
  expect(searchButton).toBeInTheDocument();
});

// unit test 2
// test to find if the text input field exists in the SearchInput component
test('renders a search input field', () => {
  render(<SearchInput />);

  // Use getByPlaceholderText to find the search input field by its placeholder text
  const searchInput = screen.getByPlaceholderText(/Type to search a word/i);

  // Assert that the search input field exists
  expect(searchInput).toBeInTheDocument();
});
/* End of Search input testes */

/* Definition List feature */
 // unit test for Renders definition list if there is no error
describe("DefinitionList component", () => {

  // Test case: mock data
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
    render(<DefinitionList definition={definition} display={true} />);

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
    render(<DefinitionList definition={errorDefinition} display={true} />);

    // Find and assert the presence of the error message element
    const errorMessage = screen.getByText(
      "No results found, please check your spelling"
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
/* End of Definition list Feature */

/* Audio Phoenetic feature */
// Test case: testing audio button feature
  describe("Audio component", () => {
  test('renders audio button if there is an audio link', () => {
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
        display={true}
      />
    );

    // Check if the audio button is rendered
    const audioButton = screen.getByTestId('audio-button');
    expect(audioButton).toBeInTheDocument();
  });

  // Test case: Renders audio button even if there is an error or no audio link fetched
  test('renders audio button even if there is an error or no audio link fetched', () => {
    // Render the DefinitionList component with an error definition because audio button is inside definition list component
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

/*SampleSentence feature */
describe("SampleSentences component", () => {

  // Test case: check if the Sample sentence component renders correctly with fetched data
  test("renders correctly with fetched data", () => {

    //Sample data with fetched data containing a sample sentence 
    const testData = [
      {
        meanings: [
          {
            definitions: [
              {
                example: "This is a sample sentence.",
              },
            ],
          },
        ],
      },
    ];

    // Render the SampleSentences component with the test data
    const { getByText } = render(
      <SampleSentences data={testData} display={true} />
    );

    // Assert that the "Usage Exapmles" title and the sample sentence are rendered correctly
    expect(getByText(/Usage Examples/i)).toBeInTheDocument();
    expect(getByText(/This is a sample sentence./i)).toBeInTheDocument();
  });

  // Test case: Check if the component does not render with a bad search input
  test("does not render with bad search input", () => {

    // Sample data with bad search input
    const testData = [
      {
        error: "Bad input",
      },
    ];

    // Render the SampleSentence component with the test data
    const { queryByText } = render(
      <SampleSentences data={testData} display={true} />
    );

    // Assert that neither the "Usage Examples" title nor the sample sentence is rendered
    expect(queryByText(/Usage Examples/i)).toBeNull();
    expect(queryByText(/This is a sample sentence./i)).toBeNull();
  });
});
/* End of Sample Sentence feature */

/* Grammar analysis feature */
describe('Grammar Analysis Feature', () => {
  // Test case: Ensure that the component renders the grammar analysis report
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
  test("Render Grammar Analysis Report", async () => {
    // Render the component
    const { getByTestId } = render(
    <MemoryRouter initialEntries={["/feedback"]}>
      <Routes>
        <Route
          path="/feedback"
          element={<Feedback userInput={"Helo, My nam were Rav"} data={definition} />}
        />
      </Routes>
    </MemoryRouter>);

    // Wait for the report to be displayed
    await waitFor(() => {

      const grammarAnalysisReport = getByTestId('grammar-analysis-report');
      

      // Expect an element with the 'grammar-analysis-report' data-testid attribute to be in the component
      expect(grammarAnalysisReport).toBeInTheDocument();
    });
  });

  // Test case:Ensure that the component fetches and stores data correctly
  test('Fetch and Store Data', async () => {
    
    // Mock the fetch request to return sample data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ /* Sample data */ }),
      })
    );

    // Render the component
    // const { grammarAnalysis } = render(<Feedback userInput={"helo, my nam were Rav."} data={definition}/>);
      const { grammarAnalysis } = render(
      <MemoryRouter initialEntries={["/feedback"]}>
        <Routes>
          <Route
            path="/feedback"
            element={<Feedback userInput={"Helo, My nam were Rav"} data={definition} />}
          />
        </Routes>
      </MemoryRouter>)
    // Wait for data to be fetched and stored
    await waitFor(() => {

      // Expect 'grammarAnalysis' to be equal to the expected data
      expect(grammarAnalysis).toEqual(/* Expected data */);
    });
  });
});
