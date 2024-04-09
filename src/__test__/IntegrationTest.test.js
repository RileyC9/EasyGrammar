import React from "react";
import { getByTestId, render, screen, waitFor, getByText, fireEvent } from "@testing-library/react";
import { Route, MemoryRouter, Routes } from "react-router-dom";
import mockAxios from "axios"
import Main from "../components/main"
import { wordSubmit } from "../components/main"
import DefinitionList from "../components/DefinitionList";
import Practice from "../components/Practice";


describe("Definition List Integration test:", () => {
  test("Search a word and display definition list component", async () => {
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
  test('Should fetch and display audio pronunciation when a word is searched', async () => {
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

  test('Should display an error message when audio pronunciation is not available for the word', async () => {

    render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path="/home" element={<Main />} />
        </Routes>
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Type to search a word...');
    const searchButton = screen.getByTitle('Get definition and AI generated image');
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            "word": "innovation",
            "phonetic": "/ˌɪnəˈveɪʃən/",
            "phonetics": [
              {
                "text": "/ˌɪnəˈveɪʃən/",
                "audio": "",
              }
            ],
            "meanings": [
              {
                "partOfSpeech": "noun",
                "definitions": [
                  {
                    "definition": "The act of innovating; the introduction of something new, in customs, rites, etc.",
                    "synonyms": [],
                    "antonyms": []
                  }
                ]
              }
            ]
          }
        ]
      })
    );
    fireEvent.change(searchInput, { target: { value: 'innovation' } });
    fireEvent.submit(searchButton);

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    setTimeout(() => {
      const audioButton = screen.queryByTestId("audio-button");
      expect(audioButton).not.toBeInTheDocument();
    }, 3000);
  });
});

describe('Sample Sentence Integration Tests:', () => {
  test('renders sample sentence when sample sentence is available', async () => {
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
        data: [
          {
            "word": "innovation",
            "phonetic": "/ˌɪnəˈveɪʃən/",
            "phonetics": [
              {
                "text": "/ˌɪnəˈveɪʃən/",
                "audio": "https://www.example.com/audio.mp3",
              }
            ],
            "meanings": [
              {
                "partOfSpeech": "noun",
                "definitions": [
                  {
                    "definition": "The act of innovating; the introduction of something new, in customs, rites, etc.",
                    "synonyms": [],
                    "antonyms": [],
                    "example": "This is a sample sentence"
                  }
                ]
              }
            ]
          }
        ]
      })
    );
    fireEvent.change(searchInput, { target: { value: "innovation" } });
    fireEvent.submit(searchButton);

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
    setTimeout(() => {
      const SampleSentence = screen.getByText("This is a sample sentence");
      expect(SampleSentence).toBeInTheDocument();
    }, 3000);
  });

  test('renders no sample sentence when there is bad input', async () => {
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
      const SampleSentence = screen.getByText("This is a sample sentence");
      expect(SampleSentence).not.toBeInTheDocument();
    }, 3000);
  });
});

// describe('Grammar Analysis Feature Integration Tests:', () => {
//   it('Should fetch and display grammar analysis when a word is searched', async () => {
//     render(
//       <MemoryRouter initialEntries={['/home']}>
//         <Routes>
//           <Route path="/home" element={<Practice />} />
//         </Routes>
//       </MemoryRouter>
//     );

//     const submitInput = screen.getByPlaceholderText('Write one or more sentences that describe the above picture.');
//     const submitButton = screen.getByTitle('Submit to get feedback from OpenAI');

//     mockAxios.get.mockImplementationOnce(() =>
//       Promise.resolve({
//         data: [
//           {
//             "word": "innovation",
//             "phonetic": "/ˌɪnəˈveɪʃən/",
//             "phonetics": [
//               {
//                 "text": "/ˌɪnəˈveɪʃən/",
//                 "audio": "https://www.example.com/audio.mp3",
//               }
//             ],

//             "meanings": [
//               {
//                 "partOfSpeech": "noun",
//                 "definitions": [
//                   {
//                     "definition": "The act of innovating; the introduction of something new, in customs, rites, etc.",
//                     "synonyms": [],
//                     "antonyms": [],
//                     "example": "This is a sample sentence"
//                   }
//                 ],
//                 "choices": [
//                   {
//                     "0": [
//                       {
//                         "message": "",
//                         "content": "Corrected text: This is grammar analysis.",
//                       }
//                     ],
//                   }
//                 ],
//               }
//             ]
//           }
//         ]
//       })
//     );

//     fireEvent.change(submitInput, { target: { value: 'This is grammar analysis.' } });
//     fireEvent.submit(submitButton);
//     //await fireEvent.submit(submitButton);
//     await waitFor(() => expect(mockAxios.get).toHaveBeenCalledTimes(1));
//     // setTimeout(() => {
//     //   const grammarreport = screen.getByTestId('how-to-improve');
//     //   expect(grammarreport).toBeInTheDocument();
//     // }, 3000);
//   });  
// });




