const path = require("path");
const ghPages = require("gh-pages");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const { exec } = require("child_process");

const askQuest = async (quest: string) => {
  return new Promise<string>((resolve, reject) => {
    try {
      readline.question(quest, (data: string) => {
        resolve(data);
      });
    } catch (e) {
      reject();
    }
  });
};

const execute = async (build: string) => {
  return new Promise<boolean>((resolve, reject) => {
    exec(`npm run ${build}`, (error: string, stdout: string) => {
      console.log(stdout);
      if (error) {
        console.log(`Build script executed with errors: ${error}\n`);
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

const publish = async (
  dir: string,
  opt: Record<string, string | undefined>
) => {
  return new Promise<boolean>((resolve, reject) => {
    ghPages.publish(dir, opt, (e: Error) => {
      if (e) {
        console.log("Error while project pubishing is occured");
        reject(false);
      } else {
        console.log("The project has been publised all right");
        resolve(true);
      }
    });
  });
};

export const main = async (args: string[]) => {
  console.log("\nThis is a program for publishing your NodeJS projects\n");

  if (args.length < 3) {
    console.log("List of params that allowed:");
    console.log("--ask, -a\t\t\tAsk questions about your project");
    console.log("--project, -p <directory>\tProject directory set");
    console.log("--dir, -d <directory>\t\tDirectory where to get data");
    console.log("--repo, -r <repository>\t\tRepository for publishing");
    console.log("--branch, -br <branch>\t\tBranch of the repo to publish in");
    console.log(
      "--build, -b <script for build>\tName of NPM script for choosen project that builds it\n"
    );

    process.exit(0);
  }

  let ask = false;
  let dir = "";
  let repo = "";
  let prj = "";
  let branch = "gh-pages";
  let build = "";

  let idx = 2;
  do {
    switch (args[idx]) {
      case "--dir":
      case "-d": {
        args[idx + 1] && (dir = args[idx + 1]);
        if (dir.match(/--\w+/)) {
          console.log("Error --dir parameter!");
          process.exit(1);
        }
        idx += 2;
        break;
      }
      case "--ask":
      case "-a": {
        ask = true;
        idx++;
        break;
      }
      case "--repo":
      case "-r": {
        args[idx + 1] && (repo = args[idx + 1]);
        if (repo.match(/--\w+/)) {
          console.log("Error --repo parameter!");
          process.exit(1);
        }
        idx += 2;
        break;
      }
      case "--project":
      case "-p": {
        args[idx + 1] && (prj = args[idx + 1]);
        if (prj.match(/--\w+/)) {
          console.log("Error --project parameter!");
          process.exit(1);
        }
        idx += 2;
        break;
      }
      case "--branch":
      case "-br": {
        args[idx + 1] && (branch = args[idx + 1]);
        if (branch.match(/--\w+/)) {
          console.log("Error --branch parameter!");
          process.exit(1);
        }
        idx += 2;
        break;
      }
      case "--build":
      case "-b": {
        args[idx + 1] && (build = args[idx + 1]);
        if (build.match(/--\w+/)) {
          console.log("Error --build parameter!");
          process.exit(1);
        }
        idx += 2;
        break;
      }
      default: {
        idx++;
      }
    }
  } while (idx < args.length);

  if (ask) {
    try {
      !prj &&
        (prj = await askQuest(
          "Please input directory for project that is being published: "
        ));
      !dir &&
        (dir = await askQuest(
          "Please enter the directory where to get the data from: "
        ));
      !repo &&
        (repo = await askQuest(
          "Please input remote repository for publishing: "
        ));
      let branchAsked = "";
      !branch &&
        (branchAsked = await askQuest(
          "Please input branch name in the remote repo (empty input is equal 'gh-pages'): "
        ));
      branchAsked && (branch = branchAsked);
      !build &&
        (build = await askQuest(
          "Please enter a command for building choosen project (empty input is equal not building): "
        ));
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  }
  readline.close();
  try {
    process.chdir(path.join(prj, ""));
  } catch (e) {
    console.log("Error: unexisting project directory was choosen");
    process.exit(1);
  }

  if (build) {
    console.log("\nBuilding...");
    await execute(build);
  }

  const options =
    branch !== "gh-pages"
      ? {
          branch: branch,
          repo: repo,
        }
      : {
          repo: repo,
        };

  await publish(dir, options);

  return true;
};
