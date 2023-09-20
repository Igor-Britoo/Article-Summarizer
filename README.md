# Article Summarizer

Welcome to the **Article Summarizer** project repository! This README will guide you through the process of setting up and running the project on your local machine.

This application allows you to input the URL of a web article, and it will provide you with a summarized version of the article's content. It simplifies the process of quickly grasping the key points and main ideas of online articles. Please note that this application relies on the [Article Extractor and Summarizer API](https://rapidapi.com/restyler/api/article-extractor-and-summarizer) for text extraction and summarization, which has a limited number of requests available per month.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites installed on your development machine:

- Node.js
- npm or Yarn

### Installation

1. Clone this repository to your local machine:

  ```bash
  git clone https://github.com/Igor-Britoo/Article-Summarizer.git
  ```

2. Navigate to the project directory:

  ```bash
  cd Article-Summarizer
  ```

3. Install project dependencies:

  ```bash
  npm install
  ```

### Configuration

Create a `.env` file in the root directory and provide the necessary values based on the provided `.env.example` file. In this case, you should include your RapidAPI key.

```env
VITE_RAPID_API_ARTICLE_KEY=your-rapidapi-key
```

## Running the App

To start the development server and run the app, you can use the available scripts defined in the `package.json` file. Open a terminal and navigate to the project directory.

- To start the development server:

  ```bash
  npm run dev
  ```

- To build the production-ready app:

  ```bash
  npm run build
  ```

- To serve the production build locally:

  ```bash
  npm run serve
  ```

## Contributing

We welcome contributions to the project. If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m "Add your changes"`.
4. Push to your forked repository: `git push origin feature/your-feature-name`.
5. Create a pull request to the main repository.

## Troubleshooting

If you encounter any issues or have questions, please open an issue on the GitHub repository. 

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE.md) file for details.