using UnityEngine;
using UnityEngine.UI;

public class DifficultyButton : MonoBehaviour
{
    private Button button;
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        button = GetComponent<Button>();
        button.onClick.AddListener(SetDifficulty);
    }

    void SetDifficulty()
    {
        Debug.Log(gameObject.name + " was clicked");
    }

    // Update is called once per frame
    void Update()
    {

    }
}
