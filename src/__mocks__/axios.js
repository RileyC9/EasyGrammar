export default {
  get: jest.fn(() => Promise.resolve({ 
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
  }))
}