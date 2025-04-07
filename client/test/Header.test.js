import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../src/components/Header';

describe('Header Component Testingg', () => {
  test('buton tıklanabilir olmalı ve doğru yazıyı içermeli', () => {
    const mockAddNote = jest.fn();
    render(<Header onAddNote={mockAddNote} />);

    // Butonu bulmak için role özelliğini kullan
    const button = screen.getByRole('button');
    // butona tıklama işlemi
    fireEvent.click(button);
    // buton başarıyla çağırıldı mı?
    expect(mockAddNote).toHaveBeenCalledTimes(1);

    // Butonun içindeki yazıyı kontrol et
    expect(button.textContent).toBe('+ Yeni Not Ekle');
  });

  test('Başlık doğru şekilde render edilmeli', () => {
    render(<Header onAddNote={jest.fn()} />);
    const headingElement = screen.getByRole('heading', { level: 1 }); // h1 etiketini al
    expect(headingElement.textContent).toBe('Tüm Notlarım');
  });

  test('Buton hover durumunda stil değişikliği olmalı', () => {
    render(<Header onAddNote={jest.fn()} />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('class')).toContain('hover:bg-blue-700');

  });
  
  test('Header snapshot testi', () => {
    // header içerisinde diğer testleri geçip burada takılırsa css değişikliği yapılmış demektir.
    const { container } = render(<Header onAddNote={jest.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("başlık kontrolü", () => {
    render(<Header />); // burada header props ile bir işim olmadığı için onu yazmıyorum.
    const element = screen.getByText("Tüm Notlarım");
    expect(element).toBeInTheDocument()
  });
});