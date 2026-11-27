document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      try { await navigator.clipboard.writeText(value); button.textContent = 'Скопировано'; }
      catch { button.textContent = 'Не удалось скопировать'; }
      setTimeout(() => { button.textContent = 'Копировать'; }, 1600);
    });
  });
});
