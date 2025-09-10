console.log(1)
document.addEventListener('DOMContentLoaded', () => {
  // 从 Pug 模板的 data 属性获取配置（推荐方式）
  const countdownContainer = document.querySelector('.countdown-container');
  if (!countdownContainer) return;

  // 从主题配置中获取目标时间（需确保主题配置正确）
  const targetDate = new Date(countdownContainer.getAttribute('data-target-date')).getTime();
  console.log(targetDate)
  if (isNaN(targetDate)) {
    console.error('倒计时目标时间无效，请检查配置！');
    return;
  }

  const $countdownDisplay = countdownContainer.querySelector('.countdown-display');
  const $countdownHeader = countdownContainer.querySelector('.countdown-header');

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;
    // 过期处理
    if (diff <= 0) {
      $countdownDisplay.innerHTML = '<div class="countdown-expired">就是今天！！！</div>';
      $countdownHeader.textContent = '⏰ 时间到！';
      return;
    }

    // 计算时间差
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 更新 DOM（保持原有结构）
    $countdownDisplay.innerHTML = `
      <div class="countdown-item">
        <span class="days">${String(days).padStart(2, '0')}</span>
        <div class="countdown-label">天</div>
      </div>
      <div class="countdown-item">
        <span class="hours">${String(hours).padStart(2, '0')}</span>
        <div class="countdown-label">时</div>
      </div>
      <div class="countdown-item">
        <span class="minutes">${String(minutes).padStart(2, '0')}</span>
        <div class="countdown-label">分</div>
      </div>
      <div class="countdown-item">
        <span class="seconds">${String(seconds).padStart(2, '0')}</span>
        <div class="countdown-label">秒</div>
      </div>
    `;

    // 秒数动画（可选）
    const $seconds = $countdownDisplay.querySelector('.seconds');
    if ($seconds) {
      $seconds.style.animation = 'none';
      setTimeout(() => {
        $seconds.style.animation = 'countdown-pulse 0.5s ease';
      }, 10);
    }
  }

  // 初始更新 + 每秒刷新
  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// 添加秒数动画样式（保持不变）
const style = document.createElement('style');
style.textContent = `
  @keyframes countdown-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); color: #ff6b6b; }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(style);