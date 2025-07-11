const supabase = supabase.createClient(
  'https://fxlppevxpkzzvnzkuntj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4bHBwZXZ4cGt6enZuemt1bnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMTg2NzMsImV4cCI6MjA2Nzc5NDY3M30.MC-zxxPv08vf2egmZyVvoBI8rAf2qlMOCSduLgEudYA'
);

const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      document.getElementById('login-error').innerText = 'Login gagal: ' + error.message;
    } else {
      window.location.href = 'dashboard.html';
    }
  });
}

async function uploadFile() {
  const file = document.getElementById('file-input').files[0];
  if (!file) return alert("Pilih file terlebih dahulu!");

  const { error } = await supabase.storage
    .from('tugas')
    .upload(`uploads/${file.name}`, file);

  if (error) {
    alert("Gagal upload: " + error.message);
  } else {
    alert("Berhasil upload!");
    loadFiles();
  }
}

async function loadFiles() {
  const { data, error } = await supabase.storage.from('tugas').list('uploads');
  if (error) return console.error(error);

  const list = document.getElementById('file-list');
  list.innerHTML = '';
  data.forEach(file => {
    const li = document.createElement('li');
    li.innerHTML = `${file.name}
      <button onclick="downloadFile('${file.name}')">Download</button>
      <button onclick="deleteFile('${file.name}')">Hapus</button>`;
    list.appendChild(li);
  });
}

async function downloadFile(name) {
  const { data } = await supabase.storage.from('tugas').getPublicUrl(`uploads/${name}`);
  window.open(data.publicUrl, '_blank');
}

async function deleteFile(name) {
  const { error } = await supabase.storage.from('tugas').remove([`uploads/${name}`]);
  if (error) alert("Gagal hapus!"); else loadFiles();
}

if (window.location.pathname.includes('dashboard.html')) loadFiles();
