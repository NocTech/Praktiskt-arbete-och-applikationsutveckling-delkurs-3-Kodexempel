import { 
  uploadFileAndCreateVectorStore,
  callResponsesAPI
} from './api.js';

// --- State ---
let currentVectorStoreId = null;

// --- DOM Elements ---
const navUploadButton = document.getElementById('nav-upload');
const navQueryButton = document.getElementById('nav-query');
const uploadPage = document.getElementById('upload-page');
const queryPage = document.getElementById('query-page');

const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
const uploadStatus = document.getElementById('upload-status');
const vectorStoreIdSpan = document.getElementById('vector-store-id');

const systemPromptTextarea = document.getElementById('system-prompt');
const userQueryInput = document.getElementById('user-query');
const queryButton = document.getElementById('query-button');
const messagesDiv = document.getElementById('messages');

// --- Navigation --- 
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');
}

navUploadButton.addEventListener('click', () => showPage('upload-page'));
navQueryButton.addEventListener('click', () => showPage('query-page'));

// --- Upload Logic ---
async function handleUpload() {
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file first.');
    return;
  }

  uploadStatus.textContent = 'Uploading file...';
  uploadButton.disabled = true;
  fileInput.disabled = true;

  try {
    const { vectorStoreId } = await uploadFileAndCreateVectorStore(file);
    currentVectorStoreId = vectorStoreId;
    vectorStoreIdSpan.textContent = currentVectorStoreId;
    uploadStatus.textContent = `Vector store created (ID: ${currentVectorStoreId}). Ready to query.`;
  } catch (error) {
    console.error('Error during upload:', error);
    uploadStatus.textContent = `Error: ${error.message}`;
    alert(`An error occurred: ${error.message}`);
  } finally {
    uploadButton.disabled = false;
    fileInput.disabled = false;
  }
}

uploadButton.addEventListener('click', handleUpload);

// --- Query Logic ---
async function handleQuery() {
  if (!currentVectorStoreId) {
    alert('Vector Store ID is missing. Please upload a document first.');
    return;
  }
  const systemPrompt = systemPromptTextarea.value.trim();
  const userQuery = userQueryInput.value.trim();

  if (!userQuery) {
    alert('Please enter a query.');
    return;
  }

  queryButton.disabled = true;
  userQueryInput.disabled = true;
  addMessage('User', userQuery);
  userQueryInput.value = ''; // Clear input

  try {
    // Call the Responses API
    const response = await callResponsesAPI(
      userQuery,
      systemPrompt
    );

    // Add the assistant's response to the UI
    addMessage('Assistant', response.output_text);

  } catch (error) {
    console.error('Error during query:', error);
    addMessage('System', `Error: ${error.message}`);
    alert(`An error occurred: ${error.message}`);
  } finally {
    queryButton.disabled = false;
    userQueryInput.disabled = false;
  }
}

queryButton.addEventListener('click', handleQuery);

// --- Helper to add messages to the UI ---
function addMessage(sender, text) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${sender}:</strong> `;
  
  const textSpan = document.createElement('span');
  textSpan.innerHTML = text.replace(/\n/g, '<br>');
  messageElement.appendChild(textSpan);

  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
  return textSpan;
}

// --- Initialization ---
showPage('upload-page'); // Start on upload page 