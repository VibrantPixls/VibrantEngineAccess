window.recallTriggers_Stats = function() {
    const cards = Array.from(document.querySelectorAll('.glass')).slice(0, -1);
    const intensity = 3;

    cards.forEach((card) => {
        let rect = null;
        card.addEventListener('mouseenter', () => {
            rect = card.getBoundingClientRect();
        });
        card.addEventListener('mousemove', (e) => {
            if (!rect) rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -intensity;
            const rotateY = ((x - centerX) / centerX) * intensity;

            card.style.setProperty('--tiltX', `${rotateX}deg`);
            card.style.setProperty('--tiltY', `${rotateY}deg`);
        });
        card.addEventListener('mouseleave', () => {
            rect = null;
            card.style.setProperty('--tiltX', '0deg');
            card.style.setProperty('--tiltY', '0deg');
        });
    });
};
recallTriggers_Stats();
