const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to get a random date between two dates
function getRandomDate(start, end) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  return new Date(startTime + Math.random() * (endTime - startTime));
}

// Function to format date to YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Function to get all files recursively
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!['node_modules', '.git', '.next'].includes(file)) {
        getAllFiles(filePath, fileList);
      }
    } else {
      if (file.match(/\.(js|jsx|ts|tsx|css|html|md|json)$/)) {
        fileList.push(filePath);
      }
    }
  });
  return fileList;
}

// Function to execute Git commands
function executeGitCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
  }
}

// Function to sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to commit and push a file with a specific date
async function commitAndPushFile(filePath, date) {
  if (!fs.existsSync(filePath)) {
    console.error(`File ${filePath} does not exist`);
    return false;
  }
  
  const fileName = path.basename(filePath);
  
  // Modify file slightly to force a change
  fs.appendFileSync(filePath, '\n');
  
  executeGitCommand(`git add "${filePath}"`);

  const commitDate = date.toISOString();
  const commitMessage = `Added ${fileName}`;
  
  const env = process.platform === 'win32' 
    ? `set GIT_AUTHOR_DATE="${commitDate}" && set GIT_COMMITTER_DATE="${commitDate}" && `
    : `export GIT_AUTHOR_DATE="${commitDate}" && export GIT_COMMITTER_DATE="${commitDate}" && `;

  executeGitCommand(`${env} git commit --date="${commitDate}" -m "${commitMessage}"`);
  
  console.log(`Pushing ${fileName}...`);
  executeGitCommand('git push origin main');

  await sleep(2000);
  return true;
}

// Main function to process files
async function processFiles(files, startDate, endDate) {
  const shuffledFiles = [...files].sort(() => Math.random() - 0.5);
  
  for (const file of shuffledFiles) {
    const randomDate = getRandomDate(startDate, endDate);
    const success = await commitAndPushFile(file, randomDate);
    if (success) {
      console.log(`Committed and pushed ${file} with date ${formatDate(randomDate)}`);
      await sleep(2000);
    }
  }
  console.log('All files have been committed and pushed!');
}

// Get command line arguments for dates
const args = process.argv.slice(2);
const startDateArg = args.find(arg => arg.startsWith('--start='))?.split('=')[1];
const endDateArg = args.find(arg => arg.startsWith('--end='))?.split('=')[1];

const startDate = startDateArg ? new Date(startDateArg) : new Date('2024-10-01');
const endDate = endDateArg ? new Date(endDateArg) : new Date('2024-12-31');

if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
  console.error('Invalid date format. Please use YYYY-MM-DD format.');
  process.exit(1);
}
if (endDate < startDate) {
  console.error('End date must be after start date.');
  process.exit(1);
}

const filesToCommit = getAllFiles('.')
  .sort((a, b) => a.localeCompare(b))
  .map(file => file.replace(/\\/g, '/'));

console.log('Files to be committed:');
filesToCommit.forEach((file, index) => {
  console.log(`${index + 1}. ${file}`);
});
console.log(`Total files to commit: ${filesToCommit.length}`);
console.log(`Date range: ${formatDate(startDate)} to ${formatDate(endDate)}`);

if (process.argv.includes('--execute')) {
  (async () => {
    await processFiles(filesToCommit, startDate, endDate);
  })();
} else {
  console.log('\nTo execute the commits, run:');
  console.log('node script.js --execute');
}

