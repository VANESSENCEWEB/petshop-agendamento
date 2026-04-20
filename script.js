// Banco de dados simulado no LocalStorage
let appointments = JSON.parse(localStorage.getItem('pet_appointments_v1')) || [];

const form = document.getElementById('appointment-form');
const list = document.getElementById('appointments-list');
const emptyState = document.getElementById('empty-state');

// Iniciar App
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    render();
});

function updateDate() {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('pt-BR', options);
}

function render() {
    list.innerHTML = '';
    
    if (appointments.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        
        // Ordena por horário antes de mostrar
        appointments.sort((a, b) => a.time.localeCompare(b.time));

        appointments.forEach(app => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="info">
                    <h3>${app.petName}</h3>
                    <p><i class="bi bi-person-circle"></i> <strong>Tutor:</strong> ${app.tutor}</p>
                    <p><i class="bi bi-stars"></i> ${app.service}</p>
                </div>
                <div style="text-align: right">
                    <span class="time-tag">${app.time}</span><br>
                    <button class="btn-delete" onclick="removeApp('${app.id}')" title="Remover">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            `;
            list.appendChild(card);
        });
    }
    localStorage.setItem('pet_appointments_v1', JSON.stringify(appointments));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newEntry = {
        id: Date.now().toString(),
        petName: document.getElementById('pet').value,
        tutor: document.getElementById('tutor').value,
        time: document.getElementById('time').value,
        service: document.getElementById('service').value
    };

    appointments.push(newEntry);
    form.reset();
    render();
});

window.removeApp = (id) => {
    if(confirm('Deseja remover este agendamento?')) {
        appointments = appointments.filter(a => a.id !== id);
        render();
    }
};
