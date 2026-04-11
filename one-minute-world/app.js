(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────────
  var selectedTask    = null;
  var taskFinished    = false;
  var currentStream   = null;
  var facingMode      = 'environment';
  var capturedDataUrl = null;
  var captureTime     = '';
  var timeInterval    = null;

  // ── DOM – screens ──────────────────────────────────────────
  var screenLocation = document.getElementById('screen-location');
  var screenTask     = document.getElementById('screen-task');
  var screenDone     = document.getElementById('screen-done');

  // ── DOM – screen 1 ─────────────────────────────────────────
  var locationBtns = document.querySelectorAll('.location-btn');
  var btnSurprise  = document.getElementById('btn-surprise');

  // ── DOM – screen 2 ─────────────────────────────────────────
  var locationBadge  = document.getElementById('location-badge');
  var taskText       = document.getElementById('task-text');
  var btnClose       = document.getElementById('btn-close');
  var btnDone        = document.getElementById('btn-done');
  var taskVisual     = document.getElementById('task-visual');
  var taskReflect    = document.getElementById('task-reflect');
  var reflectInput   = document.getElementById('reflect-input');
  var cameraInput    = document.getElementById('camera-input');
  var photoPreview   = document.getElementById('photo-preview');
  var photoImg       = document.getElementById('photo-img');

  // ── DOM – camera screen ────────────────────────────────────
  var btnOpenCamera  = document.getElementById('btn-open-camera');
  var screenCamera   = document.getElementById('screen-camera');
  var cameraVideo    = document.getElementById('camera-video');
  var cameraCanvas   = document.getElementById('camera-canvas');
  var btnCamCancel   = document.getElementById('btn-cam-cancel');
  var btnShutter     = document.getElementById('btn-shutter');
  var btnCamFlip     = document.getElementById('btn-cam-flip');
  var camTaskText    = document.getElementById('cam-task-text');
  var camTimeBadge   = document.getElementById('cam-time-badge');

  // ── DOM – after photo screen ───────────────────────────────
  var screenAfter    = document.getElementById('screen-after');
  var afterPhotoImg  = document.getElementById('after-photo-img');
  var afterTaskText  = document.getElementById('after-task-text');
  var afterTimestamp = document.getElementById('after-timestamp');
  var btnSavePhoto   = document.getElementById('btn-save-photo');
  var btnRetake      = document.getElementById('btn-retake');
  var btnKeep        = document.getElementById('btn-keep');

  // ── DOM – screen 3 ─────────────────────────────────────────
  var closingText = document.getElementById('closing-text');

  // ── Screen management ──────────────────────────────────────
  function showScreen(screen) {
    screenLocation.classList.remove('active');
    screenTask.classList.remove('active');
    screenDone.classList.remove('active');
    screen.classList.add('active');
  }

  // ── Task selection ─────────────────────────────────────────
  function getHourSlot() {
    var now = new Date();
    var startOfYear = new Date(now.getFullYear(), 0, 0);
    var dayOfYear = Math.floor((now - startOfYear) / 86400000);
    return dayOfYear * 24 + now.getHours();
  }

  function filterTasks(location) {
    if (!location) {
      return TASKS.filter(function (t) { return t.locations.indexOf('all') !== -1; });
    }
    return TASKS.filter(function (t) {
      return t.locations.indexOf('all') !== -1 || t.locations.indexOf(location) !== -1;
    });
  }

  function pickTask(location) {
    var pool = filterTasks(location);
    if (!pool.length) pool = TASKS;
    return pool[getHourSlot() % pool.length];
  }

  // ── Show/hide type-specific UI ─────────────────────────────
  function updateTaskUI(task) {
    taskVisual.classList.add('hidden');
    taskReflect.classList.add('hidden');
    if (task.type === 'visual') {
      taskVisual.classList.remove('hidden');
    } else if (task.type === 'reflect') {
      taskReflect.classList.remove('hidden');
    }
  }

  // ── Go to task screen ──────────────────────────────────────
  function goToTask(location) {
    selectedTask  = pickTask(location);
    taskFinished  = false;

    taskText.textContent = selectedTask.text;

    if (location) {
      locationBadge.textContent = location;
      locationBadge.removeAttribute('hidden');
    } else {
      locationBadge.textContent = '';
      locationBadge.setAttribute('hidden', '');
    }

    updateTaskUI(selectedTask);
    reflectInput.value = '';
    photoPreview.classList.add('hidden');
    photoImg.src = '';

    showScreen(screenTask);
  }

  // ── Go to done screen ──────────────────────────────────────
  function goToDone() {
    if (taskFinished) return;
    taskFinished = true;

    if (selectedTask) {
      closingText.textContent = selectedTask.closing;
    }
    showScreen(screenDone);
  }

  // ── Event listeners ────────────────────────────────────────

  // Location buttons
  locationBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      goToTask(btn.dataset.location);
    });
  });

  // Surprise me — picks from universal tasks only
  btnSurprise.addEventListener('click', function () {
    goToTask(null);
  });

  // Close / restart
  btnClose.addEventListener('click', function () {
    window.location.reload();
  });

  // I'm done
  btnDone.addEventListener('click', function () {
    goToDone();
  });

  // ── Camera helpers ─────────────────────────────────────────

  function fmtTime() {
    var d = new Date();
    return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
  }

  function startTimeBadge() {
    camTimeBadge.textContent = fmtTime();
    timeInterval = setInterval(function () {
      camTimeBadge.textContent = fmtTime();
    }, 1000);
  }

  function stopTimeBadge() {
    clearInterval(timeInterval);
    timeInterval = null;
  }

  function stopStream() {
    if (currentStream) {
      currentStream.getTracks().forEach(function (t) { t.stop(); });
      currentStream = null;
    }
    cameraVideo.srcObject = null;
  }

  function startStream() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      hideCameraScreen();
      cameraInput.click();
      return;
    }
    if (currentStream) stopStream();
    navigator.mediaDevices.getUserMedia({ video: { facingMode: facingMode }, audio: false })
      .then(function (stream) {
        currentStream = stream;
        cameraVideo.srcObject = stream;
      })
      .catch(function () {
        hideCameraScreen();
        cameraInput.click();
      });
  }

  function showCameraScreen() {
    camTaskText.textContent = selectedTask ? selectedTask.text : '';
    screenCamera.classList.add('active');
    startTimeBadge();
    startStream();
  }

  function hideCameraScreen() {
    screenCamera.classList.remove('active');
    stopTimeBadge();
    stopStream();
  }

  function showAfterScreen(dataUrl, time) {
    afterPhotoImg.src = dataUrl;
    afterTaskText.textContent = selectedTask ? selectedTask.text : '';
    afterTimestamp.textContent = 'taken at ' + time + ' \u00b7 not saved unless you choose to';
    btnSavePhoto.textContent = 'save to device';
    btnSavePhoto.classList.remove('saved');
    screenAfter.classList.add('active');
  }

  function hideAfterScreen() {
    screenAfter.classList.remove('active');
    afterPhotoImg.src = '';
    capturedDataUrl = null;
  }

  function capturePhoto() {
    var w = cameraVideo.videoWidth;
    var h = cameraVideo.videoHeight;
    if (!w || !h) return;
    cameraCanvas.width  = w;
    cameraCanvas.height = h;
    cameraCanvas.getContext('2d').drawImage(cameraVideo, 0, 0, w, h);
    capturedDataUrl = cameraCanvas.toDataURL('image/jpeg', 0.85);
    captureTime = fmtTime();
    hideCameraScreen();
    showAfterScreen(capturedDataUrl, captureTime);
  }

  function savePhoto() {
    if (!capturedDataUrl) return;
    var a = document.createElement('a');
    a.href = capturedDataUrl;
    a.download = 'one-minute-world.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    btnSavePhoto.textContent = 'saved';
    btnSavePhoto.classList.add('saved');
  }

  // ── Camera event listeners ─────────────────────────────────
  btnOpenCamera.addEventListener('click', function () {
    showCameraScreen();
  });

  btnCamCancel.addEventListener('click', function () {
    hideCameraScreen();
  });

  btnShutter.addEventListener('click', function () {
    capturePhoto();
  });

  btnCamFlip.addEventListener('click', function () {
    facingMode = facingMode === 'environment' ? 'user' : 'environment';
    startStream();
  });

  btnRetake.addEventListener('click', function () {
    hideAfterScreen();
    showCameraScreen();
  });

  btnKeep.addEventListener('click', function () {
    hideAfterScreen();
    goToDone();
  });

  btnSavePhoto.addEventListener('click', function () {
    savePhoto();
  });

  // Camera — display local thumbnail only, nothing is uploaded
  cameraInput.addEventListener('change', function () {
    var file = this.files[0];
    if (!file) return;
    var url = URL.createObjectURL(file);
    photoImg.src = url;
    photoPreview.classList.remove('hidden');
  });

})();
