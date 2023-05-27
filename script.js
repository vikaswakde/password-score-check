const passwordInput = document.getElementById("password-input");
const strengthIndicator = document.getElementById("strength-indicator");
const feedbackMessage = document.getElementById("feedback-message");
const passwordForm = document.getElementById("password-form");

passwordInput.addEventListener("input", function() {
  const password = passwordInput.value;
  const strength = calculatePasswordStrength(password);
  updateStrengthIndicator(strength);
  updateFeedbackMessage(strength);
});

passwordForm.addEventListener("submit", function(event) {
  event.preventDefault();
});

function calculatePasswordStrength(password) {
  let strength = 0;
  if (password.length > 8) {
    strength++;
  }
  if (/[a-z]/.test(password)) {
    strength++;
  }
  if (/[A-Z]/.test(password)) {
    strength++;
  }
  if (/[0-9]/.test(password)) {
    strength++;
  }
  if (/[^a-zA-Z0-9]/.test(password)) {
    strength++;
  }
  return strength;
}

function mapStrengthToSecureScore(strength) {
  if (strength === 5) {
    return "Excellent [800-850]";
  } else if (strength === 4) {
    return "Very Good [740-799]";
  } else if (strength === 3) {
    return "Good [670-739]";
  } else if (strength === 2) {
    return "Fair [580-669]";
  } else if (strength === 1) {
    return "Poor [300-579]";
  } else {
    return "";
  }
}

function updateStrengthIndicator(strength) {
  const progressBar = document.getElementById("strength-indicator");
  progressBar.classList.remove("weak", "medium", "strong");

  if (strength === 1) {
    progressBar.classList.add("weak");
  } else if (strength === 2) {
    progressBar.classList.add("medium");
  } else if (strength >= 3) {
    progressBar.classList.add("strong");
  }
}

function updateFeedbackMessage(strength) {
  const feedbackMessage = document.getElementById("feedback-message");

  feedbackMessage.classList.remove("feedback-weak", "feedback-medium", "feedback-strong");

  let message;
  if (strength === 1) {
    message = "Weak password BRO ☠️";
    feedbackMessage.classList.add("feedback-weak");
  } else if (strength === 2) {
    message = "Medium password BRO ⚠️";
    feedbackMessage.classList.add("feedback-medium");
  } else if (strength >= 3) {
    message = "Strong password BRO 🦍!";
    feedbackMessage.classList.add("feedback-strong");
  } else {
    message = "";
  }

  const secureScore = mapStrengthToSecureScore(strength);
  if (secureScore) {
    const secureScoreLine = `<span class="message-line">Score:</span><span class="secure-score">${secureScore}</span>`;
    message += `<div class="message-line">${secureScoreLine}</div>`;
  }

  feedbackMessage.innerHTML = message;
  feedbackMessage.classList.toggle("show", message.length > 0);
}
