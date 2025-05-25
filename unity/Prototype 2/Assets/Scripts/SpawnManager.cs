using NUnit.Framework.Internal;
using UnityEngine;

public class SpawnManager : MonoBehaviour
{
    public GameObject[] animalsPrefabs;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        int animalIndex = Random.Range(0, animalsPrefabs.Length);
        if (Input.GetKeyDown(KeyCode.S)) {
            Instantiate(animalsPrefabs[animalIndex], new Vector3(0, 0, 20), animalsPrefabs[animalIndex].transform.rotation);
        }
    }
}
