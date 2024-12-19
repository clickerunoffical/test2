// Handle Comments
document.getElementById('commentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get user comment
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim();

    if (commentText) {
        // Create a new comment element
        const commentContainer = document.getElementById('commentsContainer');
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.textContent = commentText;

        // Append the comment and clear input
        commentContainer.appendChild(newComment);
        commentInput.value = '';
    }
});
