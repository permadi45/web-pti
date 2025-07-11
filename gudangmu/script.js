const supabaseUrl = 'https://fxlppevxpkzzvnzkuntj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4bHBwZXZ4cGt6enZuemt1bnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMTg2NzMsImV4cCI6MjA2Nzc5NDY3M30.MC-zxxPv08vf2egmZyVvoBI8rAf2qlMOCSduLgEudYA';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Silakan isi email dan password.");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password: password
  });

  if (error) {
    alert("Login gagal: " + error.message);
  } else {
    alert("Login berhasil!");
    window.location.href = "dashboard.html";
  }
}
