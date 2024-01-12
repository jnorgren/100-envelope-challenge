document.addEventListener('DOMContentLoaded', () => {
    const envelopes = Array.from({ length: 100 }, (_, i) => i + 1);
    const selectedEnvelopes = new Set();

    const drawButton = document.getElementById('drawButton');
    const envelopeDisplay = document.getElementById('envelopeDisplay');
    const selectedEnvelopesList = document.getElementById('selectedEnvelopes');

    drawButton.addEventListener('click', () => {
        if (envelopes.length === 0) {
            envelopeDisplay.textContent = 'Challenge Completed!';
            drawButton.disabled = true;
            return;
        }

        const randomIndex = Math.floor(Math.random() * envelopes.length);
        const selectedEnvelope = envelopes.splice(randomIndex, 1)[0];
        selectedEnvelopes.add(selectedEnvelope);
        envelopeDisplay.textContent = `You drew envelope number: ${selectedEnvelope}`;

        renderSelectedEnvelopes();
    });

    function renderSelectedEnvelopes() {
        selectedEnvelopesList.innerHTML = '';
        Array.from(selectedEnvelopes).sort((a, b) => a - b).forEach(number => {
            const li = document.createElement('li');
            li.textContent = `Envelope ${number}: $${number}`;
            selectedEnvelopesList.appendChild(li);
        });
    }
});
