using JetBrains.Annotations;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    private float speed = 40f;
    private Rigidbody playerRb;
    private float horizontalInput;
    private float verticalInput;
    private float xBounds = 23.15f;
    private float zBoundsTop = 3.84f;
    private float zBoundsBottom = -18.12f;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        playerRb = GetComponent<Rigidbody>();
    }

    // Update is called once per frame
    void Update()
    {
        movePlayer();
    }

    private void movePlayer()
    {
        constrainPlayer();

        horizontalInput = Input.GetAxis("Horizontal");
        verticalInput = Input.GetAxis("Vertical");
        Vector3 move = transform.right * horizontalInput + transform.forward * verticalInput;
        transform.Translate(move * speed * Time.deltaTime);
    }

    private void constrainPlayer()
    {
        if (transform.position.x < -xBounds)
        {
            transform.position = new Vector3(-xBounds, transform.position.y, transform.position.z);
        }
        if (transform.position.x > xBounds)
        {
            transform.position = new Vector3(xBounds, transform.position.y, transform.position.z);
        }
        if (transform.position.z > zBoundsTop)
        {
            transform.position = new Vector3(transform.position.x, transform.position.y, zBoundsTop);
        }
        if (transform.position.z < zBoundsBottom)
        {
            transform.position = new Vector3(transform.position.x, transform.position.y, zBoundsBottom);
        }
    }
}
