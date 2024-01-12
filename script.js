document.addEventListener('DOMContentLoaded', () => {
    const totalEnvelopes = 100;
    let envelopes = initializeEnvelopes();

    const drawButton = document.getElementById('drawButton');
    const envelopeDisplay = document.getElementById('envelopeDisplay');
    const selectedEnvelopesList = document.getElementById('selectedEnvelopes');

    drawButton.addEventListener('click', () => {
        const remainingEnvelopes = envelopes.filter(env => !env.isSelected);
        if (remainingEnvelopes.length === 0) {
            envelopeDisplay.textContent = 'Challenge Completed!';
            drawButton.disabled = true;
            return;
        }

        const randomIndex = Math.floor(Math.random() * remainingEnvelopes.length);
        const selectedEnvelope = remainingEnvelopes[randomIndex];
        selectedEnvelope.isSelected = true;
        saveEnvelopes();

        envelopeDisplay.textContent = `You drew envelope number: ${selectedEnvelope.id}`;
        renderSelectedEnvelopes();
    });

    function initializeEnvelopes() {
        const storedEnvelopes = localStorage.getItem('envelopes');
        if (storedEnvelopes) {
            return JSON.parse(storedEnvelopes);
        }

        const newEnvelopes = Array.from({ length: totalEnvelopes }, (_, i) => ({ id: i + 1, isSelected: false }));
        localStorage.setItem('envelopes', JSON.stringify(newEnvelopes));
        return newEnvelopes;
    }

    function saveEnvelopes() {
        localStorage.setItem('envelopes', JSON.stringify(envelopes));
    }

    function renderSelectedEnvelopes() {
        selectedEnvelopesList.innerHTML = '';
        envelopes.filter(env => env.isSelected).forEach(envelope => {
            const li = document.createElement('li');
            li.textContent = `Envelope ${envelope.id}: $${envelope.id}`;
            selectedEnvelopesList.appendChild(li);
        });
    }

    renderSelectedEnvelopes();
});
