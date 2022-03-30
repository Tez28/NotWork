async function addEquipmentFormHandler(event) {
    event.preventDefault();
  
    // access the title and content fields and retreives user's input
    const equipment_name = document.querySelector('input[name="equipment-body"]').value;
    const type = document.querySelector('select[name="equipment-type"]').value;
    const category_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(equipment_name);
    console.log(type);
    console.log(category_id);



  
    // calls the 'posts' route and POSTs those values
    const response = await fetch('../api/equipment', {
      method: 'POST',
      body: JSON.stringify({
        equipment_name,
        type,
        category_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    // if everything goes as planned, the post is added, and user is returned to updated dashboard
    if (response.ok) {
      document.location.replace(`/category/${category_id}`);
    } else {
      alert(response.statusText);
    }
  }
  
  document
    .querySelector('.equipment-form')
    .addEventListener('submit', addEquipmentFormHandler);