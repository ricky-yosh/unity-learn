using UnityEngine;

public class MoveUpZ : MonoBehaviour
{
    private float zBoundsTop = 15f;
    private float currentZPosition;
    private float speed = 5f;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        currentZPosition = transform.position.z;
    }

    // Update is called once per frame
    void Update()
    {
        currentZPosition += speed * Time.deltaTime;
        transform.position = new Vector3(transform.position.x, transform.position.y, currentZPosition);
        if (transform.position.z > zBoundsTop)
        {
            Destroy(gameObject);
        }
    }
}
