const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>Number(n).toLocaleString('ru-RU');
const sizeOf=p=>`${p.width}x${p.length}`;
const specs=p=>[['Ширина, м',p.width],['Длина, м',p.length],['Страна производства',p.made],['Плотность узлов, на м²',fmt(p.density)],['Основной цвет',p.color],['Узор',p.pattern?'Есть':'Нет'],['Материал',p.materials]];
