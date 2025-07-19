// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const skillItems = document.querySelectorAll('.skill-item');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.querySelector('.contact-form form');

// Sidebar navigation logic
const sidebarItems = document.querySelectorAll('.sidebar-item');
const sections = document.querySelectorAll('.section');
const pageTitle = document.querySelector('.page-title');

// Mobile menu elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');

// Create mobile menu toggle if it doesn't exist
if (!mobileMenuToggle) {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-menu-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(toggleBtn);
}

// Create sidebar overlay if it doesn't exist
if (!sidebarOverlay) {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
}

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
            overlay.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('mobile-open') ? 'hidden' : '';
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking on sidebar items
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                sidebar.classList.remove('mobile-open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});

sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
        sidebarItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const sectionId = item.getAttribute('data-section');
        sections.forEach(section => {
            if (section.id === sectionId + '-section') {
                section.classList.add('active');
                pageTitle.textContent = item.textContent.trim();
            } else {
                section.classList.remove('active');
            }
        });
        // Re-render section if needed
        if (sectionId === 'knowledge') renderKnowledgeBase();
        if (sectionId === 'contacts') renderContacts();
        if (sectionId === 'tickets') renderTickets();
        if (sectionId === 'analytics') renderAnalytics();
        if (sectionId === 'settings') renderSettings();
    });
});

// Sidebar collapse/expand logic
const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
sidebarToggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    // Optionally, update the icon
    const icon = sidebarToggleBtn.querySelector('i');
    if (sidebar.classList.contains('collapsed')) {
        icon.classList.remove('fa-angle-double-left');
        icon.classList.add('fa-angle-double-right');
    } else {
        icon.classList.remove('fa-angle-double-right');
        icon.classList.add('fa-angle-double-left');
    }
});

// Dummy data
let knowledgeBase = [
    { title: 'How to reset password', category: 'Account', updated: '2024-06-01', content: 'To reset your password, go to settings > security.' },
    { title: 'Integrate with API', category: 'Integration', updated: '2024-05-28', content: 'API integration steps: 1. Get API key. 2. Use endpoint.' },
    { title: 'User roles explained', category: 'Permissions', updated: '2024-05-20', content: 'Roles: Admin, Editor, Viewer. Each has different permissions.' },
];
let contacts = [
    { name: 'Alex Chen', email: 'alex@company.com', company: 'Acme Corp', status: 'Active', phone: '+60123456789', notes: 'VIP client.' },
    { name: 'Maria Gomez', email: 'maria@company.com', company: 'Beta Ltd', status: 'Inactive', phone: '+60123456788', notes: 'Requested demo.' },
    { name: 'John Smith', email: 'john@company.com', company: 'Gamma Inc', status: 'Active', phone: '+60123456787', notes: 'Frequent support tickets.' },
];
let tickets = [
    { id: 'TCK-001', subject: 'Login issue', status: 'Open', assigned: 'Alex Chen', details: 'User cannot log in after password reset.' },
    { id: 'TCK-002', subject: 'Feature request', status: 'Resolved', assigned: 'Maria Gomez', details: 'Request for dark mode.' },
    { id: 'TCK-003', subject: 'Bug in dashboard', status: 'Open', assigned: 'John Smith', details: 'Dashboard widgets not loading.' },
];
let recentActivity = [
    'Added new article: Integrate with API',
    'Resolved ticket: Feature request',
    'Added new contact: Maria Gomez',
    'Updated article: User roles explained',
];

// Populate dashboard widgets
function updateDashboardWidgets() {
    document.getElementById('total-articles').textContent = knowledgeBase.length;
    document.getElementById('total-contacts').textContent = contacts.length;
    document.getElementById('open-tickets').textContent = tickets.filter(t => t.status === 'Open').length;
    document.getElementById('resolved-tickets').textContent = tickets.filter(t => t.status === 'Resolved').length;
    const activityList = document.getElementById('recent-activity-list');
    activityList.innerHTML = '';
    recentActivity.slice(0, 5).forEach(act => {
        const li = document.createElement('li');
        li.textContent = act;
        activityList.appendChild(li);
    });
}

// Populate knowledge base table
function renderKnowledgeBase() {
    const tbody = document.getElementById('knowledge-table-body');
    tbody.innerHTML = '';
    knowledgeBase.forEach((article, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="Title"><a href="#" class="link" data-action="view-article" data-idx="${idx}">${article.title}</a></td>
            <td data-label="Category">${article.category}</td>
            <td data-label="Last Updated">${article.updated}</td>
            <td data-label="Actions">
                <button class="btn btn-primary btn-sm" data-action="edit-article" data-idx="${idx}">Edit</button>
                <button class="btn btn-danger btn-sm" data-action="delete-article" data-idx="${idx}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    // Add event listeners for actions
    tbody.querySelectorAll('[data-action]').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const idx = +el.getAttribute('data-idx');
            const action = el.getAttribute('data-action');
            if (action === 'edit-article') openModal('edit-article', idx);
            if (action === 'delete-article') deleteArticle(idx);
            if (action === 'view-article') openModal('view-article', idx);
        });
    });
}

function deleteArticle(idx) {
    if (confirm('Delete this article?')) {
        recentActivity.unshift(`Deleted article: ${knowledgeBase[idx].title}`);
        knowledgeBase.splice(idx, 1);
        renderKnowledgeBase();
        updateDashboardWidgets();
    }
}

// Populate contacts table
function renderContacts() {
    const tbody = document.getElementById('contacts-table-body');
    tbody.innerHTML = '';
    contacts.forEach((contact, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="Name"><a href="#" class="link" data-action="view-contact" data-idx="${idx}">${contact.name}</a></td>
            <td data-label="Email">${contact.email}</td>
            <td data-label="Company">${contact.company}</td>
            <td data-label="Status">${contact.status}</td>
            <td data-label="Actions">
                <button class="btn btn-primary btn-sm" data-action="edit-contact" data-idx="${idx}">Edit</button>
                <button class="btn btn-danger btn-sm" data-action="delete-contact" data-idx="${idx}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    tbody.querySelectorAll('[data-action]').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const idx = +el.getAttribute('data-idx');
            const action = el.getAttribute('data-action');
            if (action === 'edit-contact') openModal('edit-contact', idx);
            if (action === 'delete-contact') deleteContact(idx);
            if (action === 'view-contact') openModal('view-contact', idx);
        });
    });
}

function deleteContact(idx) {
    if (confirm('Delete this contact?')) {
        recentActivity.unshift(`Deleted contact: ${contacts[idx].name}`);
        contacts.splice(idx, 1);
        renderContacts();
        updateDashboardWidgets();
    }
}

// Populate tickets table
function renderTickets() {
    const tbody = document.getElementById('tickets-table-body');
    tbody.innerHTML = '';
    tickets.forEach((ticket, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="Ticket ID"><a href="#" class="link" data-action="view-ticket" data-idx="${idx}">${ticket.id}</a></td>
            <td data-label="Subject">${ticket.subject}</td>
            <td data-label="Status">${ticket.status}</td>
            <td data-label="Assigned To">${ticket.assigned}</td>
            <td data-label="Actions">
                <button class="btn btn-primary btn-sm" data-action="edit-ticket" data-idx="${idx}">Edit</button>
                <button class="btn btn-danger btn-sm" data-action="delete-ticket" data-idx="${idx}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    tbody.querySelectorAll('[data-action]').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const idx = +el.getAttribute('data-idx');
            const action = el.getAttribute('data-action');
            if (action === 'edit-ticket') openModal('edit-ticket', idx);
            if (action === 'delete-ticket') deleteTicket(idx);
            if (action === 'view-ticket') openModal('view-ticket', idx);
        });
    });
}

function deleteTicket(idx) {
    if (confirm('Delete this ticket?')) {
        recentActivity.unshift(`Deleted ticket: ${tickets[idx].id}`);
        tickets.splice(idx, 1);
        renderTickets();
        updateDashboardWidgets();
    }
}

// Modal logic
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModalBtn = document.getElementById('close-modal');

function openModal(type, idx) {
    modal.classList.remove('hidden');
    let html = '';
    if (type === 'edit-article') {
        const article = knowledgeBase[idx];
        html = `
            <h3 class="text-xl font-semibold mb-4">Edit Article</h3>
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Title</label>
                    <input type="text" value="${article.title}" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200" id="edit-article-title">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Category</label>
                    <input type="text" value="${article.category}" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200" id="edit-article-category">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Last Updated</label>
                    <input type="date" value="${article.updated}" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200" id="edit-article-updated">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Content</label>
                    <textarea class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200" id="edit-article-content">${article.content}</textarea>
                </div>
                <button class="mt-2 bg-pink-200 hover:bg-pink-300 text-pink-900 font-semibold rounded px-4 py-2 transition" id="save-article-btn">Save</button>
            </div>
        `;
        modalBody.innerHTML = html;
        document.getElementById('save-article-btn').onclick = function() {
            article.title = document.getElementById('edit-article-title').value;
            article.category = document.getElementById('edit-article-category').value;
            article.updated = document.getElementById('edit-article-updated').value;
            article.content = document.getElementById('edit-article-content').value;
            recentActivity.unshift(`Edited article: ${article.title}`);
            renderKnowledgeBase();
            updateDashboardWidgets();
            modal.classList.add('hidden');
        };
    } else if (type === 'add-article') {
        html = `
            <h3 class="text-xl font-semibold mb-4">Add Article</h3>
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Title</label>
                    <input type="text" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200" id="add-article-title">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Category</label>
                    <input type="text" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200" id="add-article-category">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Last Updated</label>
                    <input type="date" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200" id="add-article-updated">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Content</label>
                    <textarea class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200" id="add-article-content"></textarea>
                </div>
                <button class="mt-2 bg-pink-200 hover:bg-pink-300 text-pink-900 font-semibold rounded px-4 py-2 transition" id="add-article-save-btn">Add</button>
            </div>
        `;
        modalBody.innerHTML = html;
        document.getElementById('add-article-save-btn').onclick = function() {
            const title = document.getElementById('add-article-title').value;
            const category = document.getElementById('add-article-category').value;
            const updated = document.getElementById('add-article-updated').value;
            const content = document.getElementById('add-article-content').value;
            if (title && category && updated) {
                knowledgeBase.unshift({ title, category, updated, content });
                recentActivity.unshift(`Added article: ${title}`);
                renderKnowledgeBase();
                updateDashboardWidgets();
                modal.classList.add('hidden');
            }
        };
    } else if (type === 'view-article') {
        const article = knowledgeBase[idx];
        html = `
            <h3 class="text-xl font-semibold mb-2">${article.title}</h3>
            <div class="mb-2 text-sm text-gray-500"><b>Category:</b> ${article.category}</div>
            <div class="mb-2 text-sm text-gray-500"><b>Last Updated:</b> ${article.updated}</div>
            <div class="mt-4">${article.content}</div>
        `;
        modalBody.innerHTML = html;
    } else if (type === 'edit-contact') {
        const contact = contacts[idx];
        html = `
            <h3 class="text-xl font-semibold mb-4">Edit Contact</h3>
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Name</label>
                    <input type="text" value="${contact.name}" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" id="edit-contact-name">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Email</label>
                    <input type="email" value="${contact.email}" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" id="edit-contact-email">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Company</label>
                    <input type="text" value="${contact.company}" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" id="edit-contact-company">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Status</label>
                    <input type="text" value="${contact.status}" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" id="edit-contact-status">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Phone</label>
                    <input type="text" value="${contact.phone}" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" id="edit-contact-phone">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Notes</label>
                    <textarea class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" id="edit-contact-notes">${contact.notes}</textarea>
                </div>
                <button class="mt-2 bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold rounded px-4 py-2 transition" id="save-contact-btn">Save</button>
            </div>
        `;
        modalBody.innerHTML = html;
        document.getElementById('save-contact-btn').onclick = function() {
            contact.name = document.getElementById('edit-contact-name').value;
            contact.email = document.getElementById('edit-contact-email').value;
            contact.company = document.getElementById('edit-contact-company').value;
            contact.status = document.getElementById('edit-contact-status').value;
            contact.phone = document.getElementById('edit-contact-phone').value;
            contact.notes = document.getElementById('edit-contact-notes').value;
            recentActivity.unshift(`Edited contact: ${contact.name}`);
            renderContacts();
            updateDashboardWidgets();
            modal.classList.add('hidden');
        };
    } else if (type === 'add-contact') {
        html = `
            <h3 class="text-xl font-semibold mb-4">Add Contact</h3>
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Name</label>
                    <input type="text" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" id="add-contact-name">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Email</label>
                    <input type="email" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" id="add-contact-email">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Company</label>
                    <input type="text" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" id="add-contact-company">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Status</label>
                    <input type="text" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" id="add-contact-status">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Phone</label>
                    <input type="text" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" id="add-contact-phone">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Notes</label>
                    <textarea class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" id="add-contact-notes"></textarea>
                </div>
                <button class="mt-2 bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold rounded px-4 py-2 transition" id="add-contact-save-btn">Add</button>
            </div>
        `;
        modalBody.innerHTML = html;
        document.getElementById('add-contact-save-btn').onclick = function() {
            const name = document.getElementById('add-contact-name').value;
            const email = document.getElementById('add-contact-email').value;
            const company = document.getElementById('add-contact-company').value;
            const status = document.getElementById('add-contact-status').value;
            const phone = document.getElementById('add-contact-phone').value;
            const notes = document.getElementById('add-contact-notes').value;
            if (name && email && company) {
                contacts.unshift({ name, email, company, status, phone, notes });
                recentActivity.unshift(`Added contact: ${name}`);
                renderContacts();
                updateDashboardWidgets();
                modal.classList.add('hidden');
            }
        };
    } else if (type === 'view-contact') {
        const contact = contacts[idx];
        html = `
            <h3 class="text-xl font-semibold mb-2">${contact.name}</h3>
            <div class="mb-2 text-sm text-gray-500"><b>Email:</b> ${contact.email}</div>
            <div class="mb-2 text-sm text-gray-500"><b>Company:</b> ${contact.company}</div>
            <div class="mb-2 text-sm text-gray-500"><b>Status:</b> ${contact.status}</div>
            <div class="mb-2 text-sm text-gray-500"><b>Phone:</b> ${contact.phone}</div>
            <div class="mt-4"><b>Notes:</b> ${contact.notes}</div>
        `;
        modalBody.innerHTML = html;
    } else if (type === 'edit-ticket') {
        const ticket = tickets[idx];
        html = `
            <h3 class="text-xl font-semibold mb-4">Edit Ticket</h3>
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Ticket ID</label>
                    <input type="text" value="${ticket.id}" class="rounded border border-gray-300 px-3 py-2 bg-gray-100" disabled>
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Subject</label>
                    <input type="text" value="${ticket.subject}" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200" id="edit-ticket-subject">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Status</label>
                    <select class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200" id="edit-ticket-status">
                        <option${ticket.status==='Open'?' selected':''}>Open</option>
                        <option${ticket.status==='Resolved'?' selected':''}>Resolved</option>
                    </select>
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Assigned To</label>
                    <input type="text" value="${ticket.assigned}" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200" id="edit-ticket-assigned">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Details</label>
                    <textarea class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200" id="edit-ticket-details">${ticket.details}</textarea>
                </div>
                <button class="mt-2 bg-purple-200 hover:bg-purple-300 text-purple-900 font-semibold rounded px-4 py-2 transition" id="save-ticket-btn">Save</button>
            </div>
        `;
        modalBody.innerHTML = html;
        document.getElementById('save-ticket-btn').onclick = function() {
            ticket.subject = document.getElementById('edit-ticket-subject').value;
            ticket.status = document.getElementById('edit-ticket-status').value;
            ticket.assigned = document.getElementById('edit-ticket-assigned').value;
            ticket.details = document.getElementById('edit-ticket-details').value;
            recentActivity.unshift(`Edited ticket: ${ticket.id}`);
            renderTickets();
            updateDashboardWidgets();
            modal.classList.add('hidden');
        };
    } else if (type === 'add-ticket') {
        html = `
            <h3 class="text-xl font-semibold mb-4">Add Ticket</h3>
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Ticket ID</label>
                    <input type="text" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200" id="add-ticket-id">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Subject</label>
                    <input type="text" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200" id="add-ticket-subject">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Status</label>
                    <select class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200" id="add-ticket-status">
                        <option>Open</option>
                        <option>Resolved</option>
                    </select>
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Assigned To</label>
                    <input type="text" class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200" id="add-ticket-assigned">
                </div>
                <div class="flex flex-col gap-1">
                    <label class="font-medium">Details</label>
                    <textarea class="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200" id="add-ticket-details"></textarea>
                </div>
                <button class="mt-2 bg-purple-200 hover:bg-purple-300 text-purple-900 font-semibold rounded px-4 py-2 transition" id="add-ticket-save-btn">Add</button>
            </div>
        `;
        modalBody.innerHTML = html;
        document.getElementById('add-ticket-save-btn').onclick = function() {
            const id = document.getElementById('add-ticket-id').value;
            const subject = document.getElementById('add-ticket-subject').value;
            const status = document.getElementById('add-ticket-status').value;
            const assigned = document.getElementById('add-ticket-assigned').value;
            const details = document.getElementById('add-ticket-details').value;
            if (id && subject && assigned) {
                tickets.unshift({ id, subject, status, assigned, details });
                recentActivity.unshift(`Added ticket: ${id}`);
                renderTickets();
                updateDashboardWidgets();
                modal.classList.add('hidden');
            }
        };
    } else if (type === 'view-ticket') {
        const ticket = tickets[idx];
        html = `
            <h3 class="text-xl font-semibold mb-2">${ticket.id} - ${ticket.subject}</h3>
            <div class="mb-2 text-sm text-gray-500"><b>Status:</b> ${ticket.status}</div>
            <div class="mb-2 text-sm text-gray-500"><b>Assigned To:</b> ${ticket.assigned}</div>
            <div class="mt-4"><b>Details:</b> ${ticket.details}</div>
        `;
        modalBody.innerHTML = html;
    }
}
window.openModal = openModal;

closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

document.getElementById('add-article-btn').addEventListener('click', () => openModal('add-article'));
document.getElementById('add-contact-btn').addEventListener('click', () => openModal('add-contact'));

// Add ticket button (add to tickets section header)
function addTicketButton() {
    const sectionHeader = document.querySelector('#tickets-section .section-header');
    if (!document.getElementById('add-ticket-btn')) {
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.id = 'add-ticket-btn';
        btn.innerHTML = '<i class="fas fa-plus"></i> Add Ticket';
        btn.onclick = () => openModal('add-ticket');
        sectionHeader.appendChild(btn);
    }
}
addTicketButton();

// Analytics (static chart using Chart.js if available, else SVG fallback)
function renderAnalytics() {
    const container = document.querySelector('.analytics-placeholder');
    container.innerHTML = `
        <div class="analytics-grid">
            <div class="analytics-card">
                <h4>Articles by Category</h4>
                <canvas id="articlesCategoryChart" width="300" height="220"></canvas>
            </div>
            <div class="analytics-card">
                <h4>Tickets by Status</h4>
                <canvas id="ticketsStatusChart" width="300" height="220"></canvas>
            </div>
            <div class="analytics-card">
                <h4>Contacts by Status</h4>
                <canvas id="contactsStatusChart" width="300" height="220"></canvas>
            </div>
            <div class="analytics-card">
                <h4>Recent Activity</h4>
                <canvas id="activityLineChart" width="300" height="220"></canvas>
            </div>
        </div>
    `;
    // Articles by Category (doughnut)
    const categoryCounts = {};
    knowledgeBase.forEach(a => {
        categoryCounts[a.category] = (categoryCounts[a.category] || 0) + 1;
    });
    new Chart(document.getElementById('articlesCategoryChart').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: Object.keys(categoryCounts),
            datasets: [{
                data: Object.values(categoryCounts),
                backgroundColor: ['#eebbc3', '#b8c1ec', '#ffd6e0', '#b8f2e6', '#f3c4fb']
            }]
        },
        options: {responsive: false, plugins: {legend: {position: 'bottom'}}}
    });
    // Tickets by Status (bar)
    const ticketStatusCounts = tickets.reduce((acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
    }, {});
    new Chart(document.getElementById('ticketsStatusChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: Object.keys(ticketStatusCounts),
            datasets: [{
                label: 'Tickets',
                data: Object.values(ticketStatusCounts),
                backgroundColor: ['#eebbc3', '#b8c1ec']
            }]
        },
        options: {responsive: false, plugins: {legend: {display: false}}}
    });
    // Contacts by Status (bar)
    const contactStatusCounts = contacts.reduce((acc, c) => {
        acc[c.status] = (acc[c.status] || 0) + 1;
        return acc;
    }, {});
    new Chart(document.getElementById('contactsStatusChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: Object.keys(contactStatusCounts),
            datasets: [{
                label: 'Contacts',
                data: Object.values(contactStatusCounts),
                backgroundColor: ['#b8f2e6', '#ffd6e0']
            }]
        },
        options: {responsive: false, plugins: {legend: {display: false}}}
    });
    // Recent Activity (line)
    const days = Array.from({length: 7}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toLocaleDateString('en-GB', {month: 'short', day: 'numeric'});
    });
    // Simulate activity count per day
    const activityCounts = Array(7).fill(0);
    recentActivity.forEach((_, i) => {
        if (i < 7) activityCounts[6 - i] = Math.floor(Math.random() * 3) + 1;
    });
    new Chart(document.getElementById('activityLineChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Activity',
                data: activityCounts,
                borderColor: '#eebbc3',
                backgroundColor: 'rgba(238,187,195,0.2)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {responsive: false, plugins: {legend: {display: false}}}
    });
}

// Settings (enhanced profile, account, preferences, notifications)
function renderSettings() {
    const container = document.querySelector('.settings-placeholder');
    container.innerHTML = `
        <div class="settings-grid">
            <div class="settings-card">
                <h3>Profile</h3>
                <div class="settings-row">
                    <label>Name</label>
                    <input type="text" class="modal-input" value="Liyana Khairul">
                </div>
                <div class="settings-row">
                    <label>Email</label>
                    <input type="email" class="modal-input" value="liyana.khairul@worq.com">
                </div>
                <div class="settings-row">
                    <label>Avatar</label>
                    <input type="file" class="modal-input">
                </div>
            </div>
            <div class="settings-card">
                <h3>Account</h3>
                <div class="settings-row">
                    <label>Password</label>
                    <input type="password" class="modal-input" value="********">
                </div>
                <div class="settings-row">
                    <label>2FA</label>
                    <select class="modal-input">
                        <option>Disabled</option>
                        <option>Enabled</option>
                    </select>
                </div>
                <div class="settings-row">
                    <label>Account Status</label>
                    <span class="status-badge active">Active</span>
                </div>
            </div>
            <div class="settings-card">
                <h3>Preferences</h3>
                <div class="settings-row">
                    <label>Theme</label>
                    <select class="modal-input">
                        <option>Light</option>
                        <option>Dark</option>
                        <option>System</option>
                    </select>
                </div>
                <div class="settings-row">
                    <label>Language</label>
                    <select class="modal-input">
                        <option>English</option>
                        <option>Bahasa</option>
                        <option>中文</option>
                    </select>
                </div>
            </div>
            <div class="settings-card">
                <h3>Notifications</h3>
                <div class="settings-row">
                    <label>Email Alerts</label>
                    <input type="checkbox" checked>
                </div>
                <div class="settings-row">
                    <label>Push Notifications</label>
                    <input type="checkbox">
                </div>
                <div class="settings-row">
                    <label>Weekly Summary</label>
                    <input type="checkbox" checked>
                </div>
            </div>
        </div>
        <div style="text-align:right;margin-top:2rem;">
            <button class="btn btn-primary">Save Changes</button>
        </div>
    `;
}

// Initial render
updateDashboardWidgets();
renderKnowledgeBase();
renderContacts();
renderTickets();
renderAnalytics();
renderSettings();

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-item, .project-card, .feature, .contact-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Skill Items Interactive Animation
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
    
    // Add click animation
    item.addEventListener('click', () => {
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 150);
    });
});

// Project Cards Hover Effects
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px)';
        card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && scrolled < hero.offsetHeight) {
        const rate = scrolled * -0.5;
        if (heroContent) heroContent.style.transform = `translateY(${rate}px)`;
        if (heroVisual) heroVisual.style.transform = `translateY(${rate * 0.5}px)`;
    }
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Create or update progress bar
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 10001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrollPercent + '%';
}

// Navbar background change on scroll
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Button click animations
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        e.target.style.position = 'relative';
        e.target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize all event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        updateNavbar();
        updateScrollProgress();
        parallaxEffect();
    });
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // Add loading animation to sections
    sections.forEach((section, index) => {
        section.classList.add('loading');
        setTimeout(() => {
            section.classList.add('loaded');
        }, index * 200);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateActiveNavLink();
    updateNavbar();
    updateScrollProgress();
    parallaxEffect();
}, 16)); // ~60fps

// Add some fun interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add cursor trail effect
    let cursorTrail = [];
    const trailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        cursorTrail.push({ x: e.clientX, y: e.clientY });
        
        if (cursorTrail.length > trailLength) {
            cursorTrail.shift();
        }
        
        // Create or update trail elements
        cursorTrail.forEach((pos, index) => {
            let dot = document.getElementById(`trail-${index}`);
            if (!dot) {
                dot = document.createElement('div');
                dot.id = `trail-${index}`;
                dot.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    opacity: ${1 - (index / trailLength)};
                    transform: scale(${1 - (index / trailLength) * 0.5});
                `;
                document.body.appendChild(dot);
            }
            
            dot.style.left = pos.x + 'px';
            dot.style.top = pos.y + 'px';
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus search (if you add a search feature)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Add search functionality here
        }
        
        // Escape to close mobile menu
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Add some Easter eggs
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Konami code activated!
        document.body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        
        konamiCode = [];
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);



