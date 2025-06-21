using UnityEngine;

public class SpawnEntities : MonoBehaviour
{
    public GameObject[] entities;
    private float spawnRangeX = 22f;
    private float spawnZ = -20f;
    private float spawnDelay = 3f;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        InvokeRepeating("SpawnEntity", 0f, spawnDelay);
    }

    // Update is called once per frame
    void Update()
    {

    }

    void SpawnEntity()
    {
        int randomIndex = Random.Range(0, entities.Length);
        GameObject entity = entities[randomIndex];
        float objectHeight = entity.GetComponent<Renderer>().bounds.size.y / 2;

        float randomSpawnX = Random.Range(-spawnRangeX, spawnRangeX);
        Vector3 spawnPoint = new Vector3(randomSpawnX, objectHeight, spawnZ);
        Instantiate(entity, spawnPoint, transform.rotation);
    }
}
