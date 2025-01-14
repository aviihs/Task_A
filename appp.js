// Get all the boxes and the container
const boxes = document.querySelectorAll('.box');
const container = document.querySelector('.container');

let draggedBox = null;

// Add mouse event listeners to enable dragging for each box
boxes.forEach((box) => {
  box.addEventListener('mousedown', (e) => {
    // Store the box being dragged
    draggedBox = box;
    box.style.cursor = 'grabbing'; // Change cursor style to indicate dragging
  });

  // Allow moving the dragged box within the container
  container.addEventListener('mousemove', (e) => {
    if (draggedBox) {
      const containerRect = container.getBoundingClientRect();
      const y = e.clientY - containerRect.top; // Calculate the new position

      // Keep the box within the container's height
      if (y > 10 && y < containerRect.height - 50) {
        draggedBox.style.top = `${y}px`; // Update the box's position
      }
    }
  });

  // When the mouse button is released, stop dragging and reorder the boxes
  window.addEventListener('mouseup', () => {
    if (draggedBox) {
      draggedBox.style.cursor = 'grab'; // Reset cursor
      reverseReorderBoxes(draggedBox); // Reorder boxes after drag
      draggedBox = null; // Clear the dragged box reference
    }
  });
});

// Function to reorder the boxes in reverse order when dragged
function reverseReorderBoxes(dragged) {
  const order = ['top', 'main', 'bottom'];

  const draggedIndex = order.indexOf(dragged.classList[1]);
  const prevIndex = (draggedIndex - 1 + 3) % 3; // Reverse the order
  const nextIndex = (draggedIndex + 1) % 3;

  const prevBox = document.querySelector(`.${order[prevIndex]}`);
  const nextBox = document.querySelector(`.${order[nextIndex]}`);

  // Swap the classes to change positions
  dragged.classList.replace(order[draggedIndex], order[prevIndex]);
  prevBox.classList.replace(order[prevIndex], order[nextIndex]);
  nextBox.classList.replace(order[nextIndex], order[draggedIndex]);

  // Reset the positions of the boxes
  document.querySelector('.top').style.top = '10px';
  document.querySelector('.main').style.top = '200px';
  document.querySelector('.bottom').style.top = '490px';
}