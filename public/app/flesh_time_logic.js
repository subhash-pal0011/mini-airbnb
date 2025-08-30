
// ISME VO LOGIC LIKHA HII JOFLESH VALA ADD KARNE PR DELETE KRNE PAR A RHA HII USKO 5 SECOND BAD DELETE KR DO

window.addEventListener('DOMContentLoaded', () => {
  const alertBox = document.getElementById('flash-alert');
  if (alertBox) {
    setTimeout(() => {
      // Bootstrap alert close
      const alert = new bootstrap.Alert(alertBox);
      alert.close();
    }, 80000); // 5 seconds
  }
});