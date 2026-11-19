// Настройки приёма заказов. Чтобы сменить сервис отправки, достаточно заменить функцию sendOrder.
const ORDER_CONFIG = {
  accessKey: '444fa4c9-c35f-457e-ad3e-06fdc2dccf9c',        // ключ Web3Forms (получается на web3forms.com, он не секретный)
  phone: '+7 (928) 528-55-88'              // показывается покупателю, если отправка не удалась
};

// order = { name, phone, whatsapp (true/false), max (true/false), text (список товаров), total }
async function sendOrder(order) {
  if (!ORDER_CONFIG.accessKey || ORDER_CONFIG.accessKey.startsWith('ВСТАВЬТЕ')) throw new Error('Не задан ключ отправки');
  const r = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: ORDER_CONFIG.accessKey,
      subject: 'Новый заказ с сайта: ' + order.name,
      from_name: 'Риал Ковры (сайт)',
      'ФИО': order.name,
      'Телефон': order.phone,
      'Есть WhatsApp на этом номере': order.whatsapp ? 'Да' : 'Нет',
      'Есть MAX на этом номере': order.max ? 'Да' : 'Нет',
      'Сумма': order.total + ' ₽',
      'Заказ': order.text
    })
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.success) throw new Error(j.message || 'Ошибка ' + r.status);
}
