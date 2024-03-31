# Encode AI Team 7: project-2-joke-gpt

## Project Description

A Joker GPT program that generates random jokes. Features include:

- Picking a topic, tone, and joke type.
- User can set the temperature parameter between 0 - 2.0 (Based ono OpenAI guidelines)
- Generate a rating on the last joke based on "Funny", "Dark", and "Appropriate" criteria.

### Sample Demo

TODO

## Instructions

### 1. Clone git repo

### 2. Install Dependencies

From root directory

```text
npm install
```

### 3. Setting up your keys

- Rename `.env.example` to `.env`

- Include your Open AI key for `OPENAI_API_KEY=` in the env file
    - Sign up for an api key at [OpenAI](https://openai.com/)

---

### 4. (If using OPEN AI) Run App

Run command in terminal of root directory:

```text
npm run dev
```

Open link in browser (Default link): [http://localhost:3000/](http://localhost:3000/)

---

### 5. (OPTIONAL for use w/Text Generation WebUI) Setup a Text Generation WebUI to run API model locally

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/oobabooga/text-generation-webui.git
   ```

2. Change to the `text-generation-webui` directory:

   ```bash
   cd text-generation-webui
   ```

3. Run the installation script:

   * Use `start_linux.sh` script for Linux

   ```bash
   ./start_linux.sh
   ```

    * Use `start_windows.bat` script for Windows in cmd

    ```bash
    start_windows.bat
    ```

    * Use `start_macos.sh` script for MacOS

    ```bash
    ./start_macos.sh
    ```

    * Use `start_wsl.bat` script for Windows Subsystem for Linux

    ```bash
    start_wsl.bat
    ```

4. Wait for the download and installation of dependencies to finish

5. When prompted, select your GPU manufacturer and model

   * You will see a list of available GPUs, select the one that matches your system by typing the corresponding letter and pressing `Enter`

   ```bash
   What is your GPU?
   A) NVIDIA
   B) AMD (Linux/MacOS only. Requires ROCm SDK 5.6 on Linux)
   C) Apple M Series
   D) Intel Arc (IPEX)
   N) None (I want to run models in CPU mode)
   ```

   * If you don't have a GPU, select `N` to run the models in CPU mode

6. Confirm selection and wait until the entire installation process finishes

   * The installation process may take a while depending on your internet connection and system specifications

     * The script should start downloading all packages in sequence

     * After all downloads are complete, the script will start installing the packages and configuring everything automatically

       * If you get any errors during the installation process, please check the error message and look for any possible missing dependencies or prerequisites

   * Look for a message saying `Successfully installed ...` at the end of the installation process

   * If is the first time installing this repository, you should also see this message:

   ```text
   *******************************************************************
   * You haven't downloaded any model yet.
   * Once the web UI launches, head over to the "Model" tab and download one.
   *******************************************************************
   ```

   * The last message in your terminal should be:

   ```text
   Running on local URL:  http://127.0.0.1:7860
   ```

   * The process is going to keep continuously running after this message

     * If you close this terminal window, the process will stop running

     * If you want to stop the application, you can press `Ctrl + C` (or `Cmd + C` for MacOS) in the terminal

7. Open your browser and go to <http://localhost:7860> to test if the application is working

8. You can use this same script to start the application in the future

   * The script will automatically detect that everything is already installed and will just start the application

9. To enable the API, you need to start the Text Generation WebUI with the `--api` flag

   * Alternatively, you can use the `Session` tab to mark the `api` checkbox in the `Boolean command-line flags` pane

   * The `openai` checkbox must be checked in the `Available extensions` pane for the API to work correctly

   * After selecting click in `Apply flags/extensions and restart`

10. The API will be available at <http://127.0.0.1:5000>
11. Load a model in the model tab if not already completed

    Read more details from source repo: [Text Generation WebUI](https://github.com/oobabooga/text-generation-webui)
---

### 6. (OPTIONAL for use w/Text Generation WebUI) Update `openai.ts` file

Open `openai.ts` file: ~app/utils/openai.ts

- Comment out or remove `apiKey: process.env.OPENAI_API_KEY,`

- Uncomment line or add ``baseURL: `http://127.0.0.1:5000/v1`,``

- Run app

    ```text
    npm run dev
    ```

- Open link in browser (Default link): [http://localhost:3000/](http://localhost:3000/)