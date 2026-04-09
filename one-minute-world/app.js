(function () {
  'use strict';

  // ── Constants ──────────────────────────────────────────────
  var RADIUS = 52;
  var CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 326.73
  var DURATION = 60;

  // ── State ──────────────────────────────────────────────────
  var selectedTask = null;
  var timeLeft = DURATION;
  var timerRunning = false;
  var timerInterval = null;
  var taskFinished = false;

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
  var timerRing      = document.getElementById('timer-ring');
  var timerProgress  = document.getElementById('timer-progress');
  var timerLabel     = document.getElementById('timer-label');
  var timerHint      = document.getElementById('timer-hint');
  var btnClose       = document.getElementById('btn-close');
  var btnDone        = document.getElementById('btn-done');
  var cameraInput    = document.getElementById('camera-input');
  var photoPreview   = document.getElementById('photo-preview');
  var photoImg       = document.getElementById('photo-img');

  // ── DOM – screen 3 ─────────────────────────────────────────
  var closingText = document.getElementById('closing-text');

  // ── Init timer ring ────────────────────────────────────────
  timerProgress.style.strokeDasharray  = CIRCUMFERENCE;
  timerProgress.style.strokeDashoffset = 0;
  timerProgress.style.transition       = 'none';

  // ── Screen management ──────────────────────────────────────
  function showScreen(screen) {
    screenLocation.classList.remove('active');
    screenTask.classList.remove('active');
    screenDone.classList.remove('active');
    screen.classList.add('active');
  }

  // ── Task selection ─────────────────────────────────────────
  function filterTasks(location) {
    if (!location) {
      return TASKS.filter(function (t) { return t.locations.indexOf('all') !== -1; });
    }
    return TASKS.filter(function (t) {
      return t.locations.indexOf('all') !== -1 || t.locations.indexOf(location) !== -1;
    });
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function pickTask(location) {
    var pool = filterTasks(location);
    return pool.length ? pickRandom(pool) : pickRandom(TASKS);
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

    resetTimer();
    photoPreview.classList.add('hidden');
    photoImg.src = '';

    showScreen(screenTask);
  }

  // ── Timer ──────────────────────────────────────────────────
  function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft      = DURATION;
    timerRunning  = false;

    timerLabel.textContent               = DURATION;
    timerProgress.style.transition       = 'none';
    timerProgress.style.strokeDashoffset = 0;
    timerHint.classList.remove('hidden');
  }

  function startTimer() {
    if (timerRunning || taskFinished) return;
    timerRunning = true;
    timerHint.classList.add('hidden');

    timerInterval = setInterval(function () {
      timeLeft--;

      var offset = CIRCUMFERENCE * (1 - timeLeft / DURATION);
      timerProgress.style.transition       = 'stroke-dashoffset 1s linear';
      timerProgress.style.strokeDashoffset = offset;
      timerLabel.textContent               = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        setTimeout(goToDone, 700);
      }
    }, 1000);
  }

  // ── Go to done screen ──────────────────────────────────────
  function goToDone() {
    if (taskFinished) return;
    taskFinished = true;

    clearInterval(timerInterval);
    timerInterval = null;

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

  // Tap timer ring to start
  timerRing.addEventListener('click', startTimer);

  // Close / restart
  btnClose.addEventListener('click', function () {
    window.location.reload();
  });

  // I'm done
  btnDone.addEventListener('click', function () {
    goToDone();
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
