  const ratingInputs = document.querySelectorAll('input[name="rating"]');
  const feedbackSection = document.querySelector('.extra-feedback');

  ratingInputs.forEach(input => {
    input.addEventListener('change', () => {
      feedbackSection.classList.add('visible');
    });
  });



